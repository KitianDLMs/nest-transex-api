import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductReportDto } from './dto/product-report-dto';

@Injectable()
export class ProductReportService {
  constructor(private readonly dataSource: DataSource) {}

  async getReport(filters: ProductReportDto, user: any) {
  const { custCode, projCode, search, page = 1, limit = 10 } = filters;

  if (!custCode) {
    throw new BadRequestException('custCode es obligatorio');
  }

  if (!user.projects?.length) {
    throw new ForbiddenException('El usuario no tiene proyectos asignados');
  }

  const allowedProjects = projCode
    ? (Array.isArray(projCode) ? projCode : [projCode]).filter(p =>
        user.projects.includes(p),
      )
    : [...user.projects];

  if (!allowedProjects.length) {
    return { page, limit, total: 0, totalPages: 0, data: [] };
  }

  const offset = (page - 1) * limit;

  // -----------------------------
  // SUBQUERY ORDENS (1 FILA POR PRODUCTO)
  // -----------------------------
  const ordlSubquery = this.dataSource
    .createQueryBuilder()
    .select([
      `TRIM(o.prod_code) AS prod_code`,
      `MAX(o.prod_descr) AS prod_descr`,
    ])
    .from('ordl', 'o')
    .where(`
      o.remove_rsn_code IS NULL
      OR o.remove_rsn_code = ''
      OR o.remove_rsn_code IN ('AUT','LIM')
    `)
    .groupBy(`TRIM(o.prod_code)`);

  // -----------------------------
  // SUBQUERY PRINCIPAL
  // -----------------------------
  const subQuery = this.dataSource
    .createQueryBuilder()
    .from('stg_nat_sap_cmds', 's')
    .innerJoin(
      `(${ordlSubquery.getQuery()})`,
      'op',
      `op.prod_code = TRIM(s.item_code)`,
    )
    .setParameters(ordlSubquery.getParameters())
    .where(
      `REGEXP_REPLACE(COALESCE(s.card_code, s.cust_code), '[^0-9]', '', 'g') = :custCode`,
      { custCode },
    )
    .andWhere(`TRIM(s.id_proyecto) IN (:...allowedProjects)`, {
      allowedProjects,
    })
    .andWhere(`
      TRIM(s.item_code) NOT ILIKE 'CAR-INCOMP'
      AND (
        TRIM(s.item_code) ILIKE 'BOM%' 
        OR TRIM(s.item_code) ~ '^[0-9]' 
        OR TRIM(s.item_code) ILIKE 'BOMBEO%'
      )
    `)
    .select([
      `TRIM(s.item_code) AS codigo`,
      `op.prod_descr AS producto`,

      `SUM(
        COALESCE(NULLIF(REPLACE(s.cantidad_ov, ',', '.'), ''), '0')::numeric
      ) AS respaldado`,

      `SUM(
        COALESCE(NULLIF(REPLACE(s.cantidad_ticket, ',', '.'), ''), '0')::numeric
      ) AS utilizado`,

      `(
        SUM(COALESCE(NULLIF(REPLACE(s.cantidad_ov, ',', '.'), ''), '0')::numeric)
        -
        SUM(COALESCE(NULLIF(REPLACE(s.cantidad_ticket, ',', '.'), ''), '0')::numeric)
      ) AS saldo`,

      `MAX(
        COALESCE(NULLIF(REPLACE(s.valor_unit_uf, ',', '.'), ''), '0')::numeric
      ) AS precio`,

      `MAX(s.numatcard) AS ordenCompra`,
    ])
    .groupBy(`TRIM(s.item_code), op.prod_descr`)
    .orderBy(`TRIM(s.item_code)`, 'ASC');

  // -----------------------------
  // TOTAL
  // -----------------------------
  const totalResult = await this.dataSource
    .createQueryBuilder()
    .select('COUNT(*)', 'total')
    .from(`(${subQuery.getQuery()})`, 'x')
    .setParameters(subQuery.getParameters())
    .getRawOne();

  const total = Number(totalResult.total);
  const totalPages = Math.ceil(total / limit);

  if (total === 0) {
    return { page, limit, total, totalPages, data: [] };
  }

  // -----------------------------
  // PAGINACIÓN
  // -----------------------------
  const rows = await this.dataSource
    .createQueryBuilder()
    .select('*')
    .from(`(${subQuery.getQuery()})`, 'p')
    .setParameters(subQuery.getParameters())
    .offset(offset)
    .limit(limit)
    .getRawMany();

  return {
    page,
    limit,
    total,
    totalPages,
    data: rows,
  };
}

}
