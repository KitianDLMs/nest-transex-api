import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTickDto } from './dto/create-tick.dto';

import { UpdateTickDto } from './dto/update-tick.dto';
import { Tick } from './entities/tick.entity';
import { TickFilterDto } from './dto/tick-filter.dto';

@Injectable()
export class TickService {
  constructor(
    @InjectRepository(Tick)
    private readonly tickRepository: Repository<Tick>,    
  ) {}

  async getProjectsForCustomer(filters: any) {
    const { custCode } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const cleanCustCode = custCode.trim();

    // ✅ Traer todos los proyectos que pertenecen al cliente desde la tabla proj
    const projects = await this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'TRIM(p.proj_code) AS proj_code',
        'TRIM(p.proj_name) AS proj_name',
      ])
      .from('proj', 'p')
      .where('TRIM(p.cust_code) = :custCode', { custCode: cleanCustCode })
      .orderBy('p.proj_name', 'ASC')
      .getRawMany();

    return projects; // [{proj_code: '107640', proj_name: 'SECTOR RANCAGUA'}, ...]
  }
  async search(filters: TickFilterDto) {
    const {
      custCode,
      projCode,
      docNumber,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
    } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const cleanCustCode = custCode.trim();

    /* =====================================================
    * QUERY PRINCIPAL (1 FILA = 1 CAMIÓN, máximo 8 m³)
    * ===================================================== */
    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'x.tkt_code AS tkt_code',
        'x.order_date AS order_date',
        'x.order_code AS order_code',
        'x.cust_code AS cust_code',
        'x.proj_code AS proj_code',
        'x.proj_name AS proj_name',
        'x.prod_name AS prod_name',
        'x.quantity AS quantity',
        'x.unit_price AS unit_price',
        'x.total_price AS total_price',
      ])
      .from(subQb => {
        const sq = subQb
          .select([
            'tktl.tkt_code AS tkt_code',
            't.order_date AS order_date',
            'TRIM(t.order_code) AS order_code',

            'TRIM(o.cust_code) AS cust_code',
            'TRIM(o.proj_code) AS proj_code',
            'TRIM(o.delv_addr) AS proj_name',

            'TRIM(l.prod_descr) AS prod_name',

            /* 🔒 CAST EXPLÍCITO y límite 8 m³ */
            'LEAST(tktl.delv_qty::numeric, 8.00) AS quantity',
            'tktl.ext_price_amt::numeric AS total_price',

            /* unit_price original */
            `
            CASE
              WHEN tktl.delv_qty::numeric > 0
              THEN tktl.ext_price_amt::numeric / tktl.delv_qty::numeric
              ELSE 0
            END AS unit_price
            `,

            `
            ROW_NUMBER() OVER (
              PARTITION BY tktl.tkt_code
              ORDER BY tktl.delv_qty::numeric DESC
            ) AS rn
            `,
          ])
          .from('tktl', 'tktl')
          .innerJoin(
            'tick',
            't',
            'TRIM(t.tkt_code) = TRIM(tktl.tkt_code)',
          )
          .innerJoin(
            'ordr',
            'o',
            `
              TRIM(o.order_code) = TRIM(t.order_code)
              AND DATE(o.order_date) = DATE(t.order_date)
            `,
          )
          .leftJoin(
            'ordl',
            'l',
            `
              TRIM(l.order_code) = TRIM(t.order_code)
              AND DATE(l.order_date) = DATE(t.order_date)
            `,
          )
          .where('TRIM(o.cust_code) = :custCode')

          /* ✅ NULLIF + CAST */
          .andWhere('NULLIF(tktl.ext_price_amt, \'\')::numeric IS NOT NULL')
          .andWhere('tktl.delv_qty::numeric > 0')

          /* 🚫 EXCLUIR BOMBEO */
          .andWhere(`
            l.prod_descr IS NULL
            OR l.prod_descr NOT ILIKE :pumpingService
          `);

        if (projCode?.trim()) {
          sq.andWhere('TRIM(o.proj_code) = :projCode');
        }

        if (docNumber?.trim()) {
          sq.andWhere('tktl.tkt_code ILIKE :docNumber');
        }

        if (dateFrom) {
          sq.andWhere('t.order_date >= :dateFrom');
        }

        if (dateTo) {
          sq.andWhere('t.order_date <= :dateTo');
        }

        return sq;
      }, 'x')
      .where('x.rn = 1')
      .orderBy('x.order_date', 'ASC')
      .setParameters({
        custCode: cleanCustCode,
        projCode: projCode?.trim(),
        docNumber: docNumber ? `%${docNumber.trim()}%` : undefined,
        dateFrom,
        dateTo,
        pumpingService: '%BOMBEO%',
      });

    if (limit > 0) {
      qb.offset((page - 1) * limit).limit(limit);
    }

    const data = await qb.getRawMany();

    /* =====================================================
    * COUNT (1 POR GUÍA REAL)
    * ===================================================== */
    const countQb = this.tickRepository.manager
      .createQueryBuilder()
      .select('COUNT(DISTINCT tktl.tkt_code)', 'total')
      .from('tktl', 'tktl')
      .innerJoin(
        'tick',
        't',
        'TRIM(t.tkt_code) = TRIM(tktl.tkt_code)',
      )
      .innerJoin(
        'ordr',
        'o',
        `
          TRIM(o.order_code) = TRIM(t.order_code)
          AND DATE(o.order_date) = DATE(t.order_date)
        `,
      )
      .where('TRIM(o.cust_code) = :custCode')

      /* 🔒 MISMA REGLA QUE EL QUERY PRINCIPAL */
      .andWhere('NULLIF(tktl.ext_price_amt, \'\')::numeric IS NOT NULL')
      .andWhere('tktl.delv_qty::numeric > 0')

      /* 🚫 EXCLUIR BOMBEO */
      .andWhere(`
        NOT EXISTS (
          SELECT 1
          FROM ordl l
          WHERE TRIM(l.order_code) = TRIM(t.order_code)
            AND DATE(l.order_date) = DATE(t.order_date)
            AND l.prod_descr ILIKE :pumpingService
        )
      `)
      .setParameters({
        custCode: cleanCustCode,
        pumpingService: '%BOMBEO%',
      });

    const { total } = await countQb.getRawOne();

    return {
      data,
      page,
      limit,
      total: Number(total),
      totalPages: limit > 0 ? Math.ceil(Number(total) / limit) : 1,
    };
  }

  async searchForExcel(filters: TickFilterDto) {
    const {
      custCode,
      projCode,
      docNumber,
      dateFrom,
      dateTo,
    } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const cleanCustCode = custCode.trim();

    /* =====================================================
    * QUERY PRINCIPAL – 1 FILA POR TICKET
    * ===================================================== */
    const qb = this.tickRepository
      .createQueryBuilder('t')
      .innerJoin(
        'ordl',
        'l',
        `
          TRIM(l.order_code) = TRIM(t.order_code)
          AND DATE(l.order_date) = DATE(t.order_date)
        `,
      )
      .leftJoin(
        'ordr',
        'o',
        `
          TRIM(o.order_code) = TRIM(t.order_code)
          AND DATE(o.order_date) = DATE(t.order_date)
        `,
      )
      .where('TRIM(t.cust_code::text) = :custCode', {
        custCode: cleanCustCode,
      })
      .andWhere('l.delv_qty > 0')
      .andWhere('l.prod_descr IS NOT NULL')
      .andWhere("TRIM(l.prod_descr) <> ''")
      .andWhere('l.prod_descr NOT ILIKE :service', {
        service: '%SERVICIO%',
      });

    /* =========================
    * FILTROS OPCIONALES
    * ========================= */
    if (projCode?.trim()) {
      qb.andWhere('TRIM(o.proj_code::text) = :projCode', {
        projCode: projCode.trim(),
      });
    }

    if (docNumber?.trim()) {
      qb.andWhere('t.tkt_code ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`,
      });
    }

    if (dateFrom) {
      qb.andWhere('t.order_date >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      qb.andWhere('t.order_date <= :dateTo', { dateTo });
    }

    /* =========================
    * SELECT FINAL (AGRUPADO)
    * ========================= */
    qb.select([
      't.tkt_code AS tkt_code',
      't.order_date AS order_date',
      'TRIM(t.order_code) AS order_code',

      'TRIM(o.proj_code) AS proj_code',
      'TRIM(o.delv_addr) AS proj_name',

      // 🔥 totales por ticket
      'SUM(l.delv_qty) AS total_qty',
      'SUM(l.delv_qty * l.price) AS total_price',
    ])
      .groupBy(`
        t.tkt_code,
        t.order_date,
        t.order_code,
        o.proj_code,
        o.delv_addr
      `)
      .orderBy('t.tkt_code', 'ASC')
      .addOrderBy('t.order_date', 'ASC');

    /* =====================================================
    * RESULTADO COMPLETO (SIN PAGINACIÓN)
    * ===================================================== */
    return await qb.getRawMany();
  }

  async create(dto: CreateTickDto, file?: Express.Multer.File) {
    const savedTick = await this.tickRepository.save(
      this.tickRepository.create(dto)
    );

    if (file) {
      const fs = await import('fs/promises');
      const path = await import('path');

      const ext = file.originalname.split('.').pop();
      const newFileName = `${dto.tkt_code}.${ext}`;

      const tmpPath = file.path;
      const finalPath = path.join(process.cwd(), 'uploads', newFileName);
      
      await fs.rename(tmpPath, finalPath);
    }
    return savedTick;
  }

  async addDocument(order_date: string, order_code: string, tkt_code: string, file: Express.Multer.File) {
    const dateValue = new Date(order_date); // ← idem
    const tick = await this.tickRepository.findOne({
      where: { order_date: dateValue, order_code, tkt_code },
    });
    if (!tick) {
      throw new NotFoundException('Tick no encontrado');
    }
    
    const ext = file.originalname.split('.').pop();
    const newFileName = `${tick.tkt_code}.${ext}`;
    const filePath = `uploads/${newFileName}`;

    const fs = await import('fs');
    fs.renameSync(file.path, filePath);
  }

  async findByCustomer(custCode: string) {
    return this.tickRepository
      .createQueryBuilder('t')
      .select([
        't.order_date      AS order_date',
        't.tkt_code        AS tkt_code',
        't.order_code      AS order_code',

        't.qty             AS qty',
        't.amt             AS total_price',
        't.tax_amt         AS tax_amount',
      ])

      .innerJoin(
        'ordr',
        'o',
        'TRIM(o.order_code) = TRIM(t.order_code)'
      )

      .where('TRIM(o.cust_code) = TRIM(:custCode)', { custCode })
      .orderBy('t.order_date', 'DESC')
      .getRawMany();
  }

  async findByCustomerPaginated(
    custCode: string,
    page = 1,
    limit = 20
  ) {
    const skip = (page - 1) * limit;

    const baseQuery = this.tickRepository
      .createQueryBuilder('t')
      .innerJoin(
        'ordr',
        'o',
        'TRIM(o.order_code) = TRIM(t.order_code)'
      )
      .where('TRIM(o.cust_code) = TRIM(:custCode)', { custCode });

    // 📌 DATA
    const data = await baseQuery
      .select([
        't.order_date AS order_date',
        't.tkt_code AS tkt_code',
        't.order_code AS order_code',
        't.qty AS qty',
        't.amt AS total_price',
        't.tax_amt AS tax_amount',
      ])
      .orderBy('t.order_date', 'DESC') // 🔥 SIEMPRE columna real
      .offset(skip)
      .limit(limit)
      .getRawMany();

    // 📌 COUNT (sin select ni orderBy)
    const total = await baseQuery.getCount();

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }



  async findAll() {
    return this.tickRepository.find();
  }

  async findOne(order_date: string, order_code: string, tkt_code: string) {
    if (!order_date) {
      throw new BadRequestException('Debe enviar un order_date válido');
    }

    const dateValue = new Date(order_date);
    if (isNaN(dateValue.getTime())) {
      throw new BadRequestException('order_date inválido');
    }

    const tick = await this.tickRepository.findOne({
      where: { 
        order_date: dateValue,
        order_code,
        tkt_code
      },
      relations: ['order'],
    });

    if (!tick) {
      throw new NotFoundException('Registro no encontrado');
    }

    return tick;
  }

  async update(order_date: string, order_code: string, tkt_code: string, dto: UpdateTickDto) {
    const dateValue = new Date(order_date);

    await this.findOne(order_date, order_code, tkt_code);
    await this.tickRepository.update(
      { order_date: dateValue, order_code, tkt_code },
      dto,
    );

    return this.findOne(order_date, order_code, tkt_code);
  }

  async remove(order_date: string, order_code: string, tkt_code: string) {

    const tick = await this.findOne(order_date, order_code, tkt_code);

    await this.tickRepository.remove(tick);

    return { deleted: true };
  }

  async deleteAllTick() {
    const allTicks = await this.tickRepository.find();
    if (allTicks.length > 0) {
      await this.tickRepository.remove(allTicks);
    }
  }
}