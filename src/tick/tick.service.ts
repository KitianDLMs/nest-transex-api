import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async search(filters: TickFilterDto, user: any) {
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

    if (!user.projects || user.projects.length === 0) {
      throw new ForbiddenException('El usuario no tiene proyectos asignados');
    }

    const cleanCustCode = custCode.trim();

    let allowedProjects = [...user.projects];

    if (projCode) {
      const requestedProj = Array.isArray(projCode)
        ? projCode.map(p => p.trim())
        : [projCode.trim()];


      allowedProjects = requestedProj.filter(p =>
        user.projects.includes(p),
      );

      if (allowedProjects.length === 0) {
        return {
          data: [],
          page,
          limit,
          total: 0,
          totalPages: 0,
        };
      }
    }

    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'TRIM(c.cust_code) AS "custCode"',
        'TRIM(c.cust_name) AS "custName"',
        'TRIM(c.proj_code) AS "projCode"',
        'COALESCE(MAX(TRIM(e.proj_name)), \'Sin proyecto\') AS "projName"',
        'TRIM(a.tkt_code) AS "tktCode"',
        'MAX(b.delv_qty) AS "m3"',
        'MAX(d.price) AS "unitPrice"',
        'MAX(d.prod_descr) AS "prodDescr"',
        'MAX(a.order_date) AS "orderDate"',
        'TRIM(a.order_code) AS "orderCode"',
      ])
      .from('tick', 'a')
      .innerJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)',
      )
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)',
      )
      .leftJoin(
        'proj',
        'e',
        'TRIM(c.proj_code) = TRIM(e.proj_code) AND TRIM(c.cust_code) = TRIM(e.cust_code)',
      )
      .leftJoin(
        'ordl',
        'd',
        `TRIM(c.order_code) = TRIM(d.order_code)
          AND DATE(c.order_date) = DATE(d.order_date)
          AND b.order_intrnl_line_num = d.order_intrnl_line_num
          AND (d.prod_descr NOT ILIKE :bombeo OR d.prod_descr IS NULL)`,
        { bombeo: '%bombeo%' },
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere('a.tkt_code IS NOT NULL AND a.tkt_code <> \'\'')
      .andWhere('(d.prod_descr IS NOT NULL OR d.price IS NOT NULL)')
      .andWhere('(a.remove_rsn_code IS NULL OR TRIM(a.remove_rsn_code) = \'\')')
      .andWhere('TRIM(c.proj_code) IN (:...allowedProjects)', {
        allowedProjects,
      });

    if (docNumber?.trim()) {
      qb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`,
      });
    }

    if (dateFrom) qb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    if (dateTo) qb.andWhere('a.order_date <= :dateTo', { dateTo });

    qb.groupBy(
      'a.tkt_code, a.order_code, c.cust_code, c.cust_name, c.proj_code',
    );

    qb.orderBy('MAX(a.order_date)', 'ASC').addOrderBy(
      'CAST(TRIM(a.tkt_code) AS BIGINT)',
      'ASC',
    );

    if (limit > 0) qb.offset((page - 1) * limit).limit(limit);

    const data = await qb.getRawMany();

    const countQb = this.tickRepository.manager
      .createQueryBuilder()
      .select('COUNT(DISTINCT a.tkt_code)', 'total')
      .from('tick', 'a')
      .innerJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)',
      )
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)',
      )
      .leftJoin(
        'proj',
        'e',
        'TRIM(c.proj_code) = TRIM(e.proj_code) AND TRIM(c.cust_code) = TRIM(e.cust_code)',
      )
      .leftJoin(
        'ordl',
        'd',
        `TRIM(c.order_code) = TRIM(d.order_code)
          AND DATE(c.order_date) = DATE(d.order_date)
          AND b.order_intrnl_line_num = d.order_intrnl_line_num
          AND (d.prod_descr NOT ILIKE :bombeo OR d.prod_descr IS NULL)`,
        { bombeo: '%bombeo%' },
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere('a.tkt_code IS NOT NULL AND a.tkt_code <> \'\'')
      .andWhere('(d.prod_descr IS NOT NULL OR d.price IS NOT NULL)')
      .andWhere('(a.remove_rsn_code IS NULL OR TRIM(a.remove_rsn_code) = \'\')')
      .andWhere('TRIM(c.proj_code) IN (:...allowedProjects)', {
        allowedProjects,
      });

    if (docNumber?.trim()) {
      countQb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`,
      });
    }

    if (dateFrom) countQb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    if (dateTo) countQb.andWhere('a.order_date <= :dateTo', { dateTo });

    const { total } = await countQb.getRawOne();

    return {
      data,
      page,
      limit,
      total: Number(total),
      totalPages: limit > 0 ? Math.ceil(Number(total) / limit) : 1,
    };
  }

  async searchForExcel(filters: TickFilterDto, user: any) {
    const { custCode, projCode, docNumber, dateFrom, dateTo } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    if (!user.projects || user.projects.length === 0) {
      throw new ForbiddenException('El usuario no tiene proyectos asignados');
    }

    const cleanCustCode = custCode.trim();

    // -------------------------------------------------
    // DETERMINAR PROYECTOS QUE REALMENTE SE PODRÁN VER
    // -------------------------------------------------
    let allowedProjects = [...user.projects];

    if (projCode) {
      const requestedProj = Array.isArray(projCode)
        ? projCode.map(p => p.trim())
        : [projCode.trim()];

      // Intersección entre usuario y filtro
      allowedProjects = requestedProj.filter(p =>
        user.projects.includes(p),
      );

      if (allowedProjects.length === 0) {
        return [];
      }
    }

    const cleanedAllowed = allowedProjects.map(p => p.trim());

    // ---------------------------------------------
    // QUERY PRINCIPAL
    // ---------------------------------------------
    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'TRIM(a.tkt_code) AS tkt_code',
        'TRIM(a.order_code) AS order_code',
        'a.order_date AS order_date',

        'TRIM(c.cust_code) AS cust_code',
        'TRIM(c.proj_code) AS proj_code',

        'COALESCE(TRIM(e.proj_name), TRIM(c.proj_code)) AS proj_name',

        'b.delv_qty AS m3',

        'd.price AS unit_price',
        'TRIM(d.prod_descr) AS prod_descr',
        'TRIM(d.prod_code) AS prod_code'
      ])
      .from('tick', 'a')
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)'
      )
      .leftJoin(
        'proj',
        'e',
        'TRIM(c.proj_code) = TRIM(e.proj_code) AND TRIM(c.cust_code) = TRIM(e.cust_code)'
      )
      .leftJoin(
        'tktl',
        'b',
        `TRIM(a.tkt_code) = TRIM(b.tkt_code)
          AND TRIM(a.order_code) = TRIM(b.order_code)
          AND DATE(a.order_date) = DATE(b.order_date)`
      )
      .leftJoin(
        'ordl',
        'd',
        `TRIM(c.order_code) = TRIM(d.order_code)
          AND DATE(c.order_date) = DATE(d.order_date)
          AND b.order_intrnl_line_num = d.order_intrnl_line_num
          AND (d.prod_descr NOT ILIKE :bombeo OR d.prod_descr IS NULL)`,
        { bombeo: '%bombeo%' }
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere('a.tkt_code IS NOT NULL AND a.tkt_code <> \'\'')
      .andWhere('(d.prod_descr IS NOT NULL OR d.price IS NOT NULL)')
      .andWhere('(a.remove_rsn_code IS NULL OR TRIM(a.remove_rsn_code) = \'\')')
      .andWhere('b.delv_qty::numeric > 0')
      // 🔥 Filtro OBLIGATORIO por proyectos del usuario
      .andWhere('TRIM(c.proj_code) IN (:...cleanedAllowed)', {
        cleanedAllowed,
      });

    // ---------------------------------------------
    // FILTROS OPCIONALES
    // ---------------------------------------------
    if (docNumber?.trim()) {
      qb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`
      });
    }

    if (dateFrom) qb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    if (dateTo) qb.andWhere('a.order_date <= :dateTo', { dateTo });

    qb.orderBy('a.order_date', 'ASC')
      .addOrderBy('CAST(TRIM(a.tkt_code) AS BIGINT)', 'ASC');

    const rows = await qb.getRawMany();

    // ---------------------------------------------
    // MAPEADO EXACTO PARA EL FRONT / EXCEL
    // ---------------------------------------------
    const mapped = rows.map(tick => ({
      Fecha: new Date(tick.order_date).toLocaleDateString('es-CL'),
      "Guía": tick.tkt_code,
      "Pedido": tick.order_code,
      "Proyecto": tick.proj_code,
      "Obra": tick.proj_name?.trim() ?? tick.proj_code?.trim(),
      "Código Producto": tick.prod_code,
      "Hormigón": tick.prod_descr,
      "Cantidad": tick.m3,
      "Precio Unitario": tick.unit_price
    }));

    return mapped;
  }

 async searchAllCodes(filters: TickFilterDto, user: any) {
    const {
      custCode,
      projCode,
      docNumber,
      dateFrom,
      dateTo
    } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    if (!user || !user.projects || user.projects.length === 0) {
      throw new ForbiddenException('El usuario no tiene proyectos asignados');
    }

    const cleanCustCode = custCode.trim();

    let allowedProjects = [...user.projects];

    if (projCode) {
      const requestedProj = Array.isArray(projCode)
        ? projCode.map(p => p.trim())
        : [projCode.trim()];

      allowedProjects = requestedProj.filter(p => user.projects.includes(p));

      if (allowedProjects.length === 0) {
        return [];
      }
    }

    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select('TRIM(a.tkt_code)', 'tktCode')
      .from('tick', 'a')
      .innerJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)'
      )
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)'
      )
      .leftJoin(
        'proj',
        'e',
        'TRIM(c.proj_code) = TRIM(e.proj_code) AND TRIM(c.cust_code) = TRIM(e.cust_code)'
      )
      .leftJoin(
        'ordl',
        'd',
        `TRIM(c.order_code) = TRIM(d.order_code)
          AND DATE(c.order_date) = DATE(d.order_date)
          AND b.order_intrnl_line_num = d.order_intrnl_line_num
          AND (d.prod_descr NOT ILIKE :bombeo OR d.prod_descr IS NULL)`,
        { bombeo: '%bombeo%' }
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere('a.tkt_code IS NOT NULL AND a.tkt_code <> \'\'')
      .andWhere('(d.prod_descr IS NOT NULL OR d.price IS NOT NULL)')
      .andWhere('(a.remove_rsn_code IS NULL OR TRIM(a.remove_rsn_code) = \'\')')
      .andWhere('TRIM(c.proj_code) IN (:...allowedProjects)', { allowedProjects });

    if (docNumber?.trim()) {
      qb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`,
      });
    }

    if (dateFrom) qb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    if (dateTo) qb.andWhere('a.order_date <= :dateTo', { dateTo });

    qb.groupBy('a.tkt_code, a.order_code, c.cust_code, c.cust_name, c.proj_code')
      .orderBy('MAX(a.order_date)', 'ASC')
      .addOrderBy('CAST(TRIM(a.tkt_code) AS BIGINT)', 'ASC');

    const rows = await qb.getRawMany();

    return rows.map(r => r.tktCode);
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

  async getAllCodes(custCode: string) {
    const rows = await this.tickRepository.find({
      where: { cust_code: custCode },
      select: { tkt_code: true },
      order: { tkt_code: 'ASC' }
    });

    return rows
      .map(r => r.tkt_code)
      .filter(code => code && code.trim() !== '');
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