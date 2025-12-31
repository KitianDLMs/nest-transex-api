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
      projCode,
      docNumber,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
    } = filters;

    if (!custCode) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const MAX_M3_PER_TICKET = 8;

    /* =====================================================
    * 0️⃣ BASE QUERY – SIN PAGINAR
    * ===================================================== */
    const ticketsRaw = await this.tickRepository
      .createQueryBuilder('t')
      .innerJoin(
        'ordr',
        'o',
        `
        TRIM(t.order_code::text) = TRIM(o.order_code::text)
        AND DATE(o.order_date) = DATE(t.order_date)
        `,
      )
      .where('TRIM(o.cust_code::text) = :custCode', {
        custCode: custCode.trim(),
      })
      .andWhere(
        projCode?.trim()
          ? 'TRIM(o.proj_code::text) = :projCode'
          : '1=1',
        { projCode: projCode?.trim() },
      )
      .andWhere(
        docNumber?.trim()
          ? 't.tkt_code ILIKE :docNumber'
          : '1=1',
        { docNumber: `%${docNumber?.trim()}%` },
      )
      .andWhere(dateFrom ? 't.order_date >= :dateFrom' : '1=1', { dateFrom })
      .andWhere(dateTo ? 't.order_date <= :dateTo' : '1=1', { dateTo })
      .andWhere(`
        EXISTS (
          SELECT 1
          FROM ordrl l
          WHERE TRIM(l.order_code) = TRIM(o.order_code)
            AND DATE(l.order_date) = DATE(t.order_date)
            AND l.prod_descr IS NOT NULL
            AND TRIM(l.prod_descr) <> ''
            AND (
              l.prod_descr ILIKE '%SERVICIO%'
              OR l.order_qty > 0
            )
        )
      `)
      .select([
        'DISTINCT ON (t.tkt_code) t.tkt_code AS tkt_code',
        't.order_date AS order_date',
        'TRIM(o.order_code) AS order_code',
        'TRIM(o.proj_code) AS proj_code',
        'TRIM(o.delv_addr) AS proj_name',
      ])
      .orderBy('t.tkt_code', 'ASC')
      .addOrderBy('t.order_date', 'ASC')
      .getRawMany();

    if (!ticketsRaw.length) {
      return { data: [], page, limit, total: 0, totalPages: 0 };
    }

    /* =====================================================
    * 1️⃣ LÍNEAS DE PEDIDO (FILTRADAS POR FECHA)
    * ===================================================== */
    const orderCodes = [...new Set(ticketsRaw.map(t => t.order_code))];

    const orderLines = await this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'TRIM(l.order_code) AS order_code',
        'DATE(l.order_date) AS order_date',
        'TRIM(l.prod_descr) AS prod_descr',
        'SUM(l.order_qty) AS total_qty',
        'MAX(l.price) AS unit_price',
      ])
      .from('ordrl', 'l')
      .where('TRIM(l.order_code) IN (:...orderCodes)', { orderCodes })
      .groupBy('l.order_code, DATE(l.order_date), l.prod_descr')
      .getRawMany();

    /* =====================================================
    * 2️⃣ MAPA order_code + fecha
    * ===================================================== */
    const orderMap = new Map<string, any>();

    for (const o of orderLines) {
      const key = `${o.order_code}_${o.order_date}`;

      orderMap.set(key, {
        prod_descr: o.prod_descr,
        total_qty: Number(o.total_qty),
        unit_price: Number(o.unit_price),
        isService: o.prod_descr.toUpperCase().includes('SERVICIO'),
      });
    }

    /* =====================================================
    * 3️⃣ ARMADO + FILTRO REAL
    * ===================================================== */
    const ticketCounter = new Map<string, number>();

    const cleanData = ticketsRaw
      .map(t => {
        const key = `${t.order_code}_${t.order_date}`;
        const order = orderMap.get(key);
        if (!order) return null;

        const used = ticketCounter.get(key) ?? 0;
        const remaining = order.total_qty - used * MAX_M3_PER_TICKET;
        const qty = Math.min(MAX_M3_PER_TICKET, remaining);

        ticketCounter.set(key, used + 1);

        if (qty <= 0) return null;

        return {
          ...t,
          prod_descr: order.prod_descr,
          total_qty: qty,
          total_price: qty * order.unit_price,
        };
      })
      .filter(Boolean);

    /* =====================================================
    * 4️⃣ PAGINACIÓN FINAL
    * ===================================================== */
    const total = cleanData.length;

    if (limit === 0) {
      return {
        data: cleanData,
        page: 1,
        limit: total,
        total,
        totalPages: 1,
      };
    }

    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = cleanData.slice(start, start + limit);

    return {
      data,
      page,
      limit,
      total,
      totalPages,
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