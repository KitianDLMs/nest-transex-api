import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTickDto } from './dto/create-tick.dto';

import { UpdateTickDto } from './dto/update-tick.dto';
import { Tick } from './entities/tick.entity';

@Injectable()
export class TickService {
  constructor(
    @InjectRepository(Tick)
    private readonly tickRepository: Repository<Tick>,
  ) {}

  async create(dto: CreateTickDto) {
    const tick = this.tickRepository.create(dto);
    return this.tickRepository.save(tick);
  }

  async findAll() {
    return this.tickRepository.find();
  }

  async findOne(order_date: string, order_code: string, tkt_code: string) {

    // Convertir string -> Date
    const dateValue = new Date(order_date);

    const tick = await this.tickRepository.findOne({
      where: { 
        order_date: dateValue, 
        order_code, 
        tkt_code 
      }
    });

    if (!tick) {
      throw new NotFoundException('Registro no encontrado');
    }

    return tick;
  }

  async update(order_date: string, order_code: string, tkt_code: string, dto: UpdateTickDto) {

    // Convertir string -> Date para poder buscar correctamente
    const dateValue = new Date(order_date);

    await this.findOne(order_date, order_code, tkt_code);

    await this.tickRepository.update(
      { 
        order_date: dateValue, 
        order_code, 
        tkt_code 
      },
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
