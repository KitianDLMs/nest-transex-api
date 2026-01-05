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
    @Body() tktCodes: string[],
    @Res() res: Response
  ) {
    if (!tktCodes || tktCodes.length === 0) {
      throw new HttpException('No hay tickets', HttpStatus.BAD_REQUEST);
    }

    const archive = archiver('zip', { zlib: { level: 9 } });

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=documentos_${Date.now()}.zip`,
    });

    archive.pipe(res);

    const basePath = join(process.cwd(), 'uploads');

    for (const code of tktCodes) {
      const filePath = join(basePath, `${code}.pdf`);

      if (existsSync(filePath)) {
        archive.file(filePath, { name: `${code}.pdf` });
      }
    }

    await archive.finalize();
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
