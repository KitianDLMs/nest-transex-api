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

  async search(filters: TickFilterDto) {
    const {
      custCode,
      project,
      docNumber,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20,
    } = filters;

    if (!custCode) {
      throw new BadRequestException('custCode es obligatorio');
    }
    const ticketsQb = this.tickRepository
      .createQueryBuilder('t')
      .innerJoin(
        'ordr',
        'o',
        'TRIM(t.order_code::text) = TRIM(o.order_code::text)',
      )
      .leftJoin(
    'proj',
    'p',
    'TRIM(o.proj_code) = TRIM(p.proj_code)',
  )

      .where('TRIM(o.cust_code::text) = :custCode', {
        custCode: custCode.trim(),
      });
      
      if (project) {
      ticketsQb.andWhere('TRIM(o.proj_code::text) = :project', {
        project: project.trim(),
      });
    }
    if (docNumber) {
      ticketsQb.andWhere('t.tkt_code ILIKE :docNumber', {
        docNumber: `%${docNumber.trim()}%`,
      });
    }
    if (dateFrom) {
      ticketsQb.andWhere('t.order_date >= :dateFrom', { dateFrom });
    }
    if (dateTo) {
      ticketsQb.andWhere('t.order_date <= :dateTo', { dateTo });
    }
        ticketsQb
        .select([
        't.tkt_code AS tkt_code',
        't.order_date AS order_date',
        'TRIM(o.order_code) AS order_code',
        'TRIM(o.proj_code) AS proj_code',
        "TRIM(SPLIT_PART(p.proj_name, '|', 2)) AS proj_name",
      ]).groupBy(`
        t.tkt_code,
        t.order_date,
        o.order_code,
        o.proj_code,
        p.proj_name
      `)
      .orderBy('t.order_date', 'DESC')
      .offset((page - 1) * limit)
      .limit(limit);
      
      const tickets = await ticketsQb.getRawMany();

    const totalResult = await this.tickRepository
      .createQueryBuilder('t')
      .innerJoin(
        'ordr',
        'o',
        'TRIM(t.order_code::text) = TRIM(o.order_code::text)',
      )
      .where('TRIM(o.cust_code::text) = :custCode', {
        custCode: custCode.trim(),
      })
      .select('COUNT(DISTINCT t.tkt_code)', 'count')
      .getRawOne();

    const total = Number(totalResult?.count || 0);

    const tktCodes = tickets.map(t => t.tkt_code);
    const productMap: Record<string, any> = {};

    if (tktCodes.length > 0) {
      const rows = await this.tickRepository
        .createQueryBuilder('t')
        .innerJoin(
          'ordr',
          'o',
          'TRIM(t.order_code::text) = TRIM(o.order_code::text)',
        )
        .innerJoin(
          'ordrl',
          'l',
          'TRIM(o.order_code::text) = TRIM(l.order_code::text)',
        )
        .where('t.tkt_code IN (:...tktCodes)', { tktCodes })
        .distinctOn(['t.tkt_code'])
        .select([
          't.tkt_code AS tkt_code',
          'TRIM(l.prod_code) AS prod_code',
          'TRIM(l.prod_descr) AS prod_descr',
          'l.order_qty AS qty',
          'l.price AS unit_price',
          '(l.order_qty * l.price) AS total_price',
        ])
        .orderBy('t.tkt_code')
        .addOrderBy('l.order_qty', 'DESC')
        .getRawMany();

      rows.forEach(r => {
        productMap[r.tkt_code] = {
          prod_code: r.prod_code,
          prod_descr: r.prod_descr,
          qty: Number(r.qty),
          unit_price: Number(r.unit_price),
          total_price: Number(r.total_price),
        };
      });
    }

    const data = tickets.map(t => {
      const product = productMap[t.tkt_code] || null;

      return {
        ...t,
        product,
        total_qty: product ? product.qty : 0,
        total_price: product ? product.total_price : 0,
      };
    });

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
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