// ---------------------- IMPORTS ----------------------
import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductReportDto } from './dto/product-report-dto';

// ---------------------- SERVICIO ----------------------
@Injectable()
export class ProductReportService {
  constructor(private readonly dataSource: DataSource) {}

  async getReport(filters: ProductReportDto, user: any) {
    const { custCode, projCode, search, page = 1, limit = 10 } = filters;

    if (!custCode) {
      throw new BadRequestException('custCode es obligatorio');
    }

    if (!user.projects || user.projects.length === 0) {
      throw new ForbiddenException('El usuario no tiene proyectos asignados');
    }

    const offset = (page - 1) * limit;

    // ----------------------
    // 1️⃣ Proyectos permitidos
    // ----------------------
    let allowedProjects = [...user.projects];
    if (projCode) {
      const requested = Array.isArray(projCode)
        ? projCode.map(p => p.trim())
        : [projCode.trim()];
      allowedProjects = requested.filter(p => user.projects.includes(p));
      if (allowedProjects.length === 0) {
        return { page, limit, total: 0, totalPages: 0, data: [] };
      }
    }

    // ----------------------
    // 2️⃣ Query base filtrada por cliente, proyectos y productos válidos
    // ----------------------
    const baseQuery = this.dataSource
      .createQueryBuilder()
      .from('stg_nat_sap_cmds', 's')
      .leftJoin(
        'ordl',
        'o',
        `
        TRIM(o.prod_code) = TRIM(s.item_code)
        AND (o.remove_rsn_code IS NULL OR o.remove_rsn_code = '' OR o.remove_rsn_code IN ('AUT','LIM'))
        `
      )
      .leftJoin(
        'ordr',
        'r',
        `
        r.order_code = s.doc_entry
        AND REGEXP_REPLACE(r.cust_code, '[^0-9]', '', 'g') = :custCode
        AND TRIM(r.proj_code) IN (:...allowedProjects)
        `,
        { custCode, allowedProjects }
      )
      .leftJoin(
        'proj',
        'p',
        'TRIM(p.proj_code) = TRIM(s.id_proyecto)'
      )
      .where(
        `REGEXP_REPLACE(COALESCE(s.card_code, s.cust_code), '[^0-9]', '', 'g') = :custCode`,
        { custCode }
      )
      .andWhere(`TRIM(s.id_proyecto) IN (:...allowedProjects)`, { allowedProjects })
      .andWhere(`
        TRIM(s.item_code) NOT ILIKE 'CAR-INCOMP'
        AND (
          TRIM(s.item_code) ILIKE 'BOM%' OR TRIM(s.item_code) ~ '^[0-9]'
        )
      `);

    if (search) {
      baseQuery.andWhere(`TRIM(s.item_code) ILIKE :search`, { search: `%${search}%` });
    }

    // ----------------------
    // 3️⃣ Total productos únicos
    // ----------------------
    const totalResult = await baseQuery.clone()
      .select('COUNT(DISTINCT TRIM(s.item_code))', 'total')
      .getRawOne();
    const total = Number(totalResult?.total ?? 0);
    const totalPages = Math.ceil(total / limit);
    if (total === 0) return { page, limit, total, totalPages, data: [] };

    // ----------------------
    // 4️⃣ Productos paginados
    // ----------------------
    const products = await baseQuery.clone()
      .select('DISTINCT TRIM(s.item_code)', 'prodCode')
      .orderBy('TRIM(s.item_code)', 'ASC')
      .offset(offset)
      .limit(limit)
      .getRawMany();
    const prodCodes = products.map(p => p.prodCode);

    if (prodCodes.length === 0) return { page, limit, total, totalPages, data: [] };

    // ----------------------
    // 5️⃣ Detalle por orden con nombre de producto
    // ----------------------
    const rows = await baseQuery.clone()
      .select([
        `TRIM(s.item_code) AS "prodCode"`,
        `COALESCE(o.prod_descr, TRIM(s.item_code)) AS "productName"`,
        `TRIM(s.doc_entry) AS "orderCode"`,
        `COALESCE(NULLIF(REPLACE(s.cantidad_ov, ',', '.'), ''), '0')::numeric AS "respaldado"`,
        `COALESCE(NULLIF(REPLACE(s.cantidad_ticket, ',', '.'), ''), '0')::numeric AS "utilizado"`,
        `(
          COALESCE(NULLIF(REPLACE(s.cantidad_ov, ',', '.'), ''), '0')::numeric
          -
          COALESCE(NULLIF(REPLACE(s.cantidad_ticket, ',', '.'), ''), '0')::numeric
        ) AS "saldo"`,
        `p.proj_name AS "projectName"`,
      ])
      .andWhere('TRIM(s.item_code) IN (:...prodCodes)', { prodCodes })
      .orderBy('TRIM(s.item_code)', 'ASC')
      .addOrderBy('s.doc_entry', 'ASC')
      .getRawMany();

    // ----------------------
    // 6️⃣ Armar estructura para frontend
    // ----------------------
    const map: Record<string, any> = {};

    rows.forEach(r => {
      // descartar filas sin orden válida
      if (!r.orderCode) return;

      if (!map[r.prodCode]) {
        map[r.prodCode] = {
          producto: r.productName,
          codigo: r.prodCode,
          totalRespaldado: 0,
          totalUtilizado: 0,
          saldo: 0,
          projectName: r.projectName,
          ordenes: [],
        };
      }

      map[r.prodCode].ordenes.push({
        ordenCompra: r.orderCode,
        respaldado: Number(r.respaldado),
        utilizado: Number(r.utilizado),
        saldo: Number(r.saldo),
      });

      map[r.prodCode].totalRespaldado += Number(r.respaldado);
      map[r.prodCode].totalUtilizado += Number(r.utilizado);
      map[r.prodCode].saldo =
        map[r.prodCode].totalRespaldado - map[r.prodCode].totalUtilizado;
    });

    // ----------------------
    // 7️⃣ Devolver resultado
    // ----------------------
    return {
      page,
      limit,
      total,
      totalPages,
      data: Object.values(map),
    };
  }
}
