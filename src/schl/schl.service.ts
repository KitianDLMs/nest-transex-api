import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schl } from './entities/schl.entity';
import { CreateSchlDto } from './dto/create-schl.dto';
import { UpdateSchlDto } from './dto/update-schl.dto';

@Injectable()
export class SchlService {
  constructor(
    @InjectRepository(Schl)
    private readonly schlRepo: Repository<Schl>,
  ) {}

  async create(dto: CreateSchlDto) {
    const entity = this.schlRepo.create(dto);
    return this.schlRepo.save(entity);
  }

  async findAll(order_date?: string, order_code?: string) {
    const qb = this.schlRepo
      .createQueryBuilder('schl')
      .where('schl.tkt_code IS NOT NULL')
      .andWhere("schl.tkt_code <> ''")
      .orderBy('schl.on_job_time', 'ASC');

    if (order_date) {
      qb.andWhere('schl.order_date = :order_date', { order_date });
    }

    if (order_code) {
      qb.andWhere('schl.order_code = :order_code', { order_code });
    }

    return qb.getMany();
  }

  async findOne(order_date: any, order_code: string, order_intrnl_line_num: number, sched_num: number, unique_num: number) {
    const record = await this.schlRepo.findOne({
      where: {
        order_date,
        order_code,
        order_intrnl_line_num,
        sched_num,
        unique_num,
      },
    });

    if (!record)
      throw new NotFoundException('SCHL record not found');

    return record;
  }

  async update(
    order_date: string,
    order_code: string,
    order_intrnl_line_num: number,
    sched_num: number,
    unique_num: number,
    dto: UpdateSchlDto,
  ) {
    const record = await this.findOne(order_date, order_code, order_intrnl_line_num, sched_num, unique_num);

    const updated = this.schlRepo.merge(record, dto);
    return this.schlRepo.save(updated);
  }

  async remove(order_date: string, order_code: string, order_intrnl_line_num: number, sched_num: number, unique_num: number) {
    const record = await this.findOne(order_date, order_code, order_intrnl_line_num, sched_num, unique_num);

    await this.schlRepo.remove(record);
    return { message: 'SCHL record deleted' };
  }

  async deleteAllSchl() {
    const allSchl = await this.schlRepo.find();
    if (allSchl.length > 0) {
      await this.schlRepo.remove(allSchl);
    }
  }

}
