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
}
