import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prjp } from './entities/prjp.entity';
import { CreatePrjpDto } from './dto/create-prjp.dto/create-prjp.dto';
import { UpdatePrjpDto } from './dto/update-prjp.dto/update-prjp.dto';

@Injectable()
export class PrjpService {
  constructor(
    @InjectRepository(Prjp)
    private readonly prjpRepository: Repository<Prjp>,
  ) {}

  async create(dto: CreatePrjpDto) {
    const item = this.prjpRepository.create(dto);
    return this.prjpRepository.save(item);
  }

  async findAll() {
    return this.prjpRepository.find();
  }

  async findOne(cust_code: string, proj_code: string, intrnl_line_num: number) {
    const item = await this.prjpRepository.findOne({
      where: { cust_code, proj_code, intrnl_line_num },
    });

    if (!item) throw new NotFoundException('PRJP no encontrado');

    return item;
  }

  async update(cust_code: string, proj_code: string, intrnl_line_num: number, dto: UpdatePrjpDto) {
    const item = await this.findOne(cust_code, proj_code, intrnl_line_num);

    return this.prjpRepository.save({ ...item, ...dto });
  }

  async remove(cust_code: string, proj_code: string, intrnl_line_num: number) {
    const item = await this.findOne(cust_code, proj_code, intrnl_line_num);
    return this.prjpRepository.remove(item);
  }

  async deleteAllPrjp() {
    const allPrjp = await this.prjpRepository.find();
    if (allPrjp.length > 0) {
      await this.prjpRepository.remove(allPrjp);
    }
  }
}
