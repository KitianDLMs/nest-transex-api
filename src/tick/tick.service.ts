import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTickDto } from './dto/create-tick.dto';

import { UpdateTickDto } from './dto/update-tick.dto';
import { Tick } from './entities/tick.entity';
import { TickDoc } from './entities/tick-doc.entity';

@Injectable()
export class TickService {
  constructor(
    @InjectRepository(Tick)
    private readonly tickRepository: Repository<Tick>,
    @InjectRepository(TickDoc)
    private readonly tickDocRepository: Repository<TickDoc>,
  ) {}

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
      const finalPath = path.join(process.cwd(), 'uploads/tick-docs', newFileName);

      // Renombrar archivo
      await fs.rename(tmpPath, finalPath);

      const tickDoc = this.tickDocRepository.create({        
        tick: savedTick,
        fileName: newFileName,
        filePath: `uploads/tick-docs/${newFileName}`
      });

      await this.tickDocRepository.save(tickDoc);
    }
    return savedTick;
  }

  async addDocument(
    order_date: string,
    order_code: string,
    tkt_code: string,
    file: Express.Multer.File,
  ) {
    // 1. Buscar el tick
    const dateValue = new Date(order_date);

    const tick = await this.tickRepository.findOne({
      where: { order_date: dateValue, order_code, tkt_code },
    });

    if (!tick) {
      throw new NotFoundException('Tick no encontrado');
    }

    // 2. Crear el nombre final del archivo
    const ext = file.originalname.split('.').pop();
    const newFileName = `${tick.tkt_code}.${ext}`;
    const filePath = `uploads/${newFileName}`;

    // 3. Guardar el archivo físicamente
    const fs = await import('fs');
    fs.renameSync(file.path, filePath);

    // 4. Crear el registro TickDoc
    const doc = this.tickDocRepository.create({
      fileName: newFileName,
      filePath,
      tick,
    });

    return this.tickDocRepository.save(doc);
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
