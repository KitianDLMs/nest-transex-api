import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFile, Res, Query, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TickService } from './tick.service';
import { CreateTickDto } from './dto/create-tick.dto';
import { UpdateTickDto } from './dto/update-tick.dto';
// import { tickFileOptions } from './tick.multer.config';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';
import * as fs from 'fs';
import * as archiver from 'archiver';
import { TickFilterDto } from './dto/tick-filter.dto';
import { DownloadZipDto } from './dto/download-zip.dto';

@Controller('tick')
export class TickController {
  constructor(private readonly tickService: TickService) {}

  @Get('search')
  async search(@Query() filters: TickFilterDto) {
    return this.tickService.search(filters);
  }

  // @Post('with-file')
  // @UseInterceptors(FileInterceptor('file', tickFileOptions))
  // async createWithFile(
  //   @Body() dto: CreateTickDto,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   return this.tickService.create(dto, file);
  // }

  @Post()
  async createWithoutFile(@Body() dto: CreateTickDto) {
    return this.tickService.create(dto);
  }

  @Get('by-customer/:custCode')
  async findByCustomer(
    @Param('custCode') custCode: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.tickService.findByCustomerPaginated(
      custCode,
      Number(page),
      Number(limit),
    );
  }

  @Get()
  async findAll() {
    return this.tickService.findAll();
  }

  
  @Patch(':order_date/:order_code/:tkt_code')
  async update(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
    @Body() dto: UpdateTickDto,
  ) {
    return this.tickService.update(order_date, order_code, tkt_code, dto);
  }

  @Delete(':order_date/:order_code/:tkt_code')
  async remove(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.remove(order_date, order_code, tkt_code);
  }

  @Get('download/:tkt_code')
  async downloadFile(
    @Param('tkt_code') tkt_code: string,
    @Res() res: Response
  ) {
    const filePath = join(
      process.cwd(),
      'uploads',
      `${tkt_code}.pdf`
    );

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Archivo ${tkt_code}.pdf no encontrado`);
    }

    return res.download(filePath, `${tkt_code}.pdf`);
  }

  @Get('export/excel')
  async exportExcel(@Query() filters: TickFilterDto) {
    return this.tickService.searchForExcel(filters);
  }

  @Post('download-zip')
  async downloadZip(
    @Body() body: DownloadZipDto,
    @Res() res: Response
  ) {
    const fs = require('fs');
    const archiver = require('archiver');
    const { join } = require('path');
    const { tmpdir } = require('os');

    const basePath = join(process.cwd(), 'uploads');
    const tktCodes = body.tktCodes?.map(c => c?.trim()).filter(c => c);
    if (!tktCodes || tktCodes.length === 0) {
      return res.status(400).json({ message: 'No hay tickets', missing: [] });
    }

    const existing: string[] = [];
    const missing: string[] = [];

    for (const code of tktCodes) {
      const filePath = join(basePath, `${code}.pdf`);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        existing.push(code);
      } else {
        missing.push(code);
      }
    }

    if (existing.length === 0) {
      return res.status(404).json({ message: 'No se encontró ningún PDF válido', missing });
    }

    // Nombre del ZIP
    const zipName = `documentos_${Date.now()}.zip`;
    const tmpPath = join(tmpdir(), zipName);

    // Crear ZIP en disco
    const output = fs.createWriteStream(tmpPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);

    // Agregar PDFs existentes
    existing.forEach(code => {
      const filePath = join(basePath, `${code}.pdf`);
      archive.file(filePath, { name: `${code}.pdf` });
    });

    // (Opcional) agregar missing.txt dentro del ZIP
    if (missing.length > 0) {
      archive.append(missing.join('\n'), { name: 'missing.txt' });
    }

    archive.finalize();

    // Cuando termine de generar el ZIP, enviarlo
    output.on('close', () => {
      res.download(tmpPath, zipName, (err) => {
        if (err) console.error(err);
        // borrar archivo temporal después de enviarlo
        fs.unlinkSync(tmpPath);
      });
    });
  }

  @Post('check-tkt-codes')
  async checkTktCodes(@Body() filters: TickFilterDto) {
    const tktCodes = await this.tickService.searchAllCodes(filters);

    const basePath = join(process.cwd(), 'uploads');
    const existing: string[] = [];
    const missing: string[] = [];

    const cleanCodes = tktCodes.map(code => code?.trim()).filter(code => code);

    for (const code of cleanCodes) {
      const filePath = join(basePath, `${code}.pdf`);
      if (existsSync(filePath)) existing.push(code);
      else missing.push(code);
    }

    return { existing, missing };
  }

  @Get(':order_date/:order_code/:tkt_code')
  async findOne(
    @Param('order_date') order_date: string,
    @Param('order_code') order_code: string,
    @Param('tkt_code') tkt_code: string,
  ) {
    return this.tickService.findOne(order_date, order_code, tkt_code);
  }
}
