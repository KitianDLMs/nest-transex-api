import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFiles, UploadedFile, Res } from '@nestjs/common';
import { CreateTickDto } from './dto/create-tick.dto';
import { UpdateTickDto } from './dto/update-tick.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { TickService } from './tick.service';
import { tickFileOptions } from './tick.multer.config';
import { existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('tick')
export class TickController {

  constructor(private tickService: TickService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', tickFileOptions))
  create(
    @Body() dto: CreateTickDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.tickService.create(dto, file);
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
  // 2025-11-21 00:00:00
  // ORD10001    
  // TK000002

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
