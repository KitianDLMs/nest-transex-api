import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { CreateTickDto } from './dto/create-tick.dto';
import { UpdateTickDto } from './dto/update-tick.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TickService } from './tick.service';
import { tickFileOptions } from './tick.multer.config';
import { existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('tick')
export class TickController {
  constructor(private tickService: TickService) {}

  // Crear ticket con archivo opcional
  @Post('with-file')
  @UseInterceptors(FileInterceptor('file', tickFileOptions))
  createWithFile(
    @Body() dto: CreateTickDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.tickService.create(dto, file);
  }

  // Crear ticket SIN archivo
  @Post()
  createWithoutFile(
    @Body() dto: CreateTickDto,
  ) {
    return this.tickService.create(dto); // no enviamos archivo
  }

  @Get()
  findAll() {
    return this.tickService.findAll();
  }

  @Get(':order_date/:order_code/:tkt_code')
  findOne(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.findOne(order_date, order_code, tkt_code);
  }

  @Get('file/:fileName')
  downloadFile(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    const filePath = join(process.cwd(), 'uploads/tick-docs', fileName);

    if (!existsSync(filePath)) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    return res.download(filePath); 
  }

  @Patch(':order_date/:order_code/:tkt_code')
  update(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
    @Body() dto: UpdateTickDto,
  ) {
    return this.tickService.update(order_date, order_code, tkt_code, dto);
  }

  @Delete(':order_date/:order_code/:tkt_code')
  remove(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.remove(order_date, order_code, tkt_code);
  }
}
