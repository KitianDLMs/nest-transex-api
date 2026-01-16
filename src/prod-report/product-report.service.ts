// ---------------------- IMPORTS ----------------------
import { Injectable, ForbiddenException } from '@nestjs/common'; // Decorador y excepción
import { DataSource } from 'typeorm'; // Para usar DataSource
import { ProductReportDto } from './dto/product-report-dto'; // Tu DTO (ajusta la ruta si es necesario)

// ---------------------- SERVICIO ----------------------
@Injectable()
export class ProductReportService {
  constructor(private readonly dataSource: DataSource) {}

  async getReport(filters: ProductReportDto, user: any) {
    const { custCode, projCode, dateFrom, dateTo, search, page = 1, limit = 10 } = filters;
    const offset = (page - 1) * limit;

    if (!user.projects || user.projects.length === 0) {
      throw new ForbiddenException('El usuario no tiene proyectos asignados');
    }

    let allowedProjects = [...user.projects];

    if (projCode) {
      const requestedProj = Array.isArray(projCode)
        ? projCode.map(p => p.trim())
        : [projCode.trim()];

      allowedProjects = requestedProj.filter(p =>
        user.projects.includes(p),
      );

      if (allowedProjects.length === 0) {
        return { page, limit, total: 0, totalPages: 0, data: [] };
      }
    }

    const baseQuery = this.dataSource.createQueryBuilder()
      .from('ordl', 'd')
      .innerJoin('ordr', 'c', 'TRIM(d.order_code) = TRIM(c.order_code)')
      .andWhere('TRIM(c.proj_code) IN (:...allowedProjects)', { allowedProjects });

    if (custCode) baseQuery.andWhere('TRIM(c.cust_code) = :custCode', { custCode });
    if (dateFrom) baseQuery.andWhere('d.order_date >= :dateFrom', { dateFrom });
    if (dateTo) {
      const dateToEnd = new Date(dateTo);
      dateToEnd.setDate(dateToEnd.getDate() + 1);
      baseQuery.andWhere('d.order_date < :dateToEnd', { dateToEnd });
    }
    if (search) {
      baseQuery.andWhere('(d.prod_descr ILIKE :search OR d.prod_code ILIKE :search)', { search: `%${search}%` });
    }

    const totalResult = await baseQuery.clone()
      .select('COUNT(DISTINCT d.prod_code)', 'total')
      .getRawOne();
    const total = Number(totalResult.total ?? 0);
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

    if (total === 0) return { page, limit, total, totalPages, data: [] };

    // 4️⃣ Obtener códigos de productos de la página
    const productCodesRaw = await baseQuery.clone()
      .select('DISTINCT d.prod_code', 'prodCode')
      .orderBy('d.prod_code', 'ASC')
      .offset(offset)
      .limit(limit)
      .getRawMany();

    const prodCodesArray = productCodesRaw.map(p => p.prodCode);
    if (prodCodesArray.length === 0) return { page, limit, total, totalPages, data: [] };

    // 5️⃣ Obtener todos los registros de esos productos
    const rawData = await baseQuery.clone()
      .select([
        `TRIM(d.prod_code) AS "prodCode"`,
        `TRIM(d.prod_descr) AS "prodDescr"`,
        `TRIM(c.order_code) AS "orderCode"`,
        `COALESCE(NULLIF(d.order_qty, ''), '0')::numeric AS "cantidadRespaldo"`,
        `COALESCE(NULLIF(d.delv_qty, ''), '0')::numeric AS "cantidadUtilizada"`,
        `(COALESCE(NULLIF(d.order_qty, ''), '0')::numeric - COALESCE(NULLIF(d.delv_qty, ''), '0')::numeric) AS "saldo"`
      ])
      .where('d.prod_code IN (:...prodCodes)', { prodCodes: prodCodesArray })
      .orderBy('d.prod_code', 'ASC')
      .addOrderBy('c.order_code', 'ASC')
      .getRawMany();

    // 6️⃣ Agrupar y calcular totales
    const dataMap: Record<string, any> = {};

    rawData.forEach(row => {
      const code = row.prodCode;
      if (!dataMap[code]) {
        dataMap[code] = {
          prodCode: row.prodCode,
          prodDescr: row.prodDescr,
          totalRespaldo: 0,
          totalUtilizada: 0,
          saldo: 0,
          orders: []
        };
      }

      dataMap[code].orders.push({
        orderCode: row.orderCode,
        cantidadRespaldo: Number(row.cantidadRespaldo),
        cantidadUtilizada: Number(row.cantidadUtilizada),
        saldo: Number(row.saldo)
      });

      dataMap[code].totalRespaldo += Number(row.cantidadRespaldo);
      dataMap[code].totalUtilizada += Number(row.cantidadUtilizada);
      dataMap[code].saldo = dataMap[code].totalRespaldo - dataMap[code].totalUtilizada;
    });

    const data = Object.values(dataMap);

    return { page, limit, total, totalPages, data };
  }
}
