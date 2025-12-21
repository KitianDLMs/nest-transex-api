import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordl } from './entities/ordl.entity';
import { CreateOrdlDto } from './dto/create-ordl.dto';
import { UpdateOrdlDto } from './dto/update-ordl.dto';

@Injectable()
export class OrdlService {
  constructor(
    @InjectRepository(Ordl)
    private readonly ordlRepository: Repository<Ordl>,    
  ) {}

  create(createOrdlDto: CreateOrdlDto) {
    const ordl = this.ordlRepository.create(createOrdlDto);
    return this.ordlRepository.save(ordl);
  }

  findAll() {
    return this.ordlRepository.find();
  }

  findOne(order_date: Date, order_code: string, order_intrnl_line_num: number) {
    return this.ordlRepository.findOneBy({ order_date, order_code, order_intrnl_line_num });
  }

  findByOrder(order_date: Date, order_code: string) {
    return this.ordlRepository.find({
      where: { order_date, order_code },
      order: { order_intrnl_line_num: 'ASC' }
    });
  }

  async update(order_date: Date, order_code: string, order_intrnl_line_num: number, updateOrdlDto: UpdateOrdlDto) {
    await this.ordlRepository.update(
      { order_date, order_code, order_intrnl_line_num },
      updateOrdlDto,
    );
    return this.findOne(order_date, order_code, order_intrnl_line_num);
  }


  remove(order_date: Date, order_code: string, order_intrnl_line_num: number) {
    return this.ordlRepository.delete({ order_date, order_code, order_intrnl_line_num });
  }

  async deleteAllOrdl() {
    const allOrdl = await this.ordlRepository.find();
    if (allOrdl.length > 0) {
      await this.ordlRepository.remove(allOrdl);
    }
  }

  async findLinesByCustomer(
    custCode: string,
    projCode?: string,
    page = 1,
    limit = 10,
  ) {
    const qb = this.ordlRepository
      .createQueryBuilder('l')
      .innerJoin(
        'ordr',
        'o',
        `
          TRIM(o.order_code) = TRIM(l.order_code)
          AND o.order_date::date = l.order_date::date
        `,
      )
      .where('TRIM(o.cust_code) = :custCode', {
        custCode: custCode.trim(),
      });

    if (projCode && projCode.trim() !== '') {
      qb.andWhere('TRIM(o.proj_code) = :projCode', {
        projCode: projCode.trim(),
      });
    }

    const total = await qb.getCount();

    const data = await qb
      .select([
        'l.order_date AS order_date',
        'l.order_code AS order_code',
        'l.prod_code AS product_code',
        'l.prod_descr AS concrete_desc',
        'l.order_qty AS quantity',
        'o.stat AS stat',
      ])
      .orderBy('l.order_date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

}
