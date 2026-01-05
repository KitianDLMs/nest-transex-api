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

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const cleanCustCode = custCode.trim();

    // Query principal
    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'a.tkt_code AS tkt_code',
        'a.order_code AS order_code',
        'a.order_date AS order_date',
        'c.proj_code AS proj_code',
        'c.cust_code AS cust_code',
        'b.delv_qty AS m3',         
        'd.price AS unit_price',  
        'd.prod_descr AS prod_descr',
      ])
      .from('tick', 'a')
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)'
      )
      .leftJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)'
      )
      .leftJoin(
        'ordl',
        'd',
        'TRIM(c.order_code) = TRIM(d.order_code) AND DATE(c.order_date) = DATE(d.order_date) AND b.order_intrnl_line_num = d.order_intrnl_line_num'
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      // Excluir tickets de bombeo
      .andWhere("d.prod_descr NOT ILIKE '%bombeo%'");

    // filtros opcionales
    if (projCode?.trim()) {
      qb.andWhere('TRIM(c.proj_code) = :projCode', { projCode: projCode.trim() });
    }

    if (docNumber?.trim()) {
      qb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', { docNumber: `%${docNumber.trim()}%` });
    }

    if (dateFrom) {
      qb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      qb.andWhere('a.order_date <= :dateTo', { dateTo });
    }

    if (limit > 0) {
      qb.offset((page - 1) * limit).limit(limit);
    }

    const data = await qb.getRawMany();

    // Conteo total
    const countQb = this.tickRepository.manager
      .createQueryBuilder()
      .select('COUNT(*)', 'total')
      .from('tick', 'a')
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)'
      )
      .leftJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)'
      )
      .leftJoin(
        'ordl',
        'd',
        'TRIM(c.order_code) = TRIM(d.order_code) AND DATE(c.order_date) = DATE(d.order_date) AND b.order_intrnl_line_num = d.order_intrnl_line_num'
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere("d.prod_descr NOT ILIKE '%bombeo%'"); // filtro de bombeo en el conteo también

    if (projCode?.trim()) {
      countQb.andWhere('TRIM(c.proj_code) = :projCode', { projCode: projCode.trim() });
    }

    if (docNumber?.trim()) {
      countQb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', { docNumber: `%${docNumber.trim()}%` });
    }

    if (dateFrom) {
      countQb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      countQb.andWhere('a.order_date <= :dateTo', { dateTo });
    }

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
    const { custCode, projCode, docNumber, dateFrom, dateTo } = filters;

    if (!custCode?.trim()) {
      throw new BadRequestException('custCode es obligatorio');
    }

    const cleanCustCode = custCode.trim();

    // Query principal – 1 fila por línea de ticket
    const qb = this.tickRepository.manager
      .createQueryBuilder()
      .select([
        'a.tkt_code AS tkt_code',
        'a.order_code AS order_code',
        'a.order_date AS order_date',
        'c.proj_code AS proj_code',
        'c.cust_code AS cust_code',
        'b.delv_qty AS m3',     // cantidad entregada
        'd.price AS unit_price',// precio unitario
        'd.prod_descr AS prod_descr', // descripción del producto
      ])
      .from('tick', 'a')
      .innerJoin(
        'ordr',
        'c',
        'TRIM(a.order_code) = TRIM(c.order_code) AND DATE(a.order_date) = DATE(c.order_date)'
      )
      .leftJoin(
        'tktl',
        'b',
        'TRIM(a.tkt_code) = TRIM(b.tkt_code) AND TRIM(a.order_code) = TRIM(b.order_code) AND DATE(a.order_date) = DATE(b.order_date)'
      )
      .leftJoin(
        'ordl',
        'd',
        'TRIM(c.order_code) = TRIM(d.order_code) AND DATE(c.order_date) = DATE(d.order_date) AND b.order_intrnl_line_num = d.order_intrnl_line_num'
      )
      .where('TRIM(c.cust_code) = :custCode', { custCode: cleanCustCode })
      .andWhere("d.prod_descr NOT ILIKE '%bombeo%'") // excluir servicios de bombeo
      .andWhere('b.delv_qty::numeric > 0')
      .andWhere('d.prod_descr IS NOT NULL')
      .andWhere("TRIM(d.prod_descr) <> ''");

    // filtros opcionales
    if (projCode?.trim()) {
      qb.andWhere('TRIM(c.proj_code) = :projCode', { projCode: projCode.trim() });
    }

    if (docNumber?.trim()) {
      qb.andWhere('TRIM(a.tkt_code) ILIKE :docNumber', { docNumber: `%${docNumber.trim()}%` });
    }

    if (dateFrom) {
      qb.andWhere('a.order_date >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      qb.andWhere('a.order_date <= :dateTo', { dateTo });
    }

    // Ordenar por ticket y fecha
    qb.orderBy('a.tkt_code', 'ASC').addOrderBy('a.order_date', 'ASC');

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