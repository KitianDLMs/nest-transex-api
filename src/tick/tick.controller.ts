import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFile, Res, Query, HttpException, HttpStatus, NotFoundException, BadRequestException, UseGuards, Req } from '@nestjs/common';
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
import { tmpdir } from 'os';
import { AuthGuard } from '@nestjs/passport';
import { GoogleDriveService } from '../google-drive/google-drive.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tick')
export class TickController {
  constructor(private readonly tickService: TickService, private readonly googleDriveService: GoogleDriveService) {}

  @Get('search')
  async search(@Query() filters: TickFilterDto, @Req() req) {
    return this.tickService.search(filters, req.user);
  }

  @Post('download-zip')
  async downloadZip(
    @Body() body: DownloadZipDto,
    @Res() res: Response,
  ) {

    const tktCodes = body.tktCodes
      ?.map(c => c.trim())
      .filter(c => c);

    if (!tktCodes || tktCodes.length === 0) {
      return res.status(400).json({
        message: 'No hay tickets',
        missing: [],
      });
    }    
    const existing: { id: string; name: string }[] = [];
    const missing: string[] = [];    
    for (const code of tktCodes) {

      const file = await this.googleDriveService.findFileByTicket(code);

      if (file) {
        existing.push(file);
      } else {
        missing.push(code);
      }
    }
    if (existing.length === 0) {
      return res.status(404).json({
        message: 'No se encontró ningún PDF',
        missing,
      });
    }
    const zipName = `documentos_${Date.now()}.zip`;
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${zipName}"`,
    );

    res.setHeader(
      'Content-Type',
      'application/zip',
    );

    if (missing.length > 0) {
      res.setHeader(
        'X-Missing-Files',
        missing.join(','),
      );
    }
    archive.pipe(res);
    for (const file of existing) {      
      const stream = await this.googleDriveService.downloadFile(file.id);
      archive.append(stream, {
        name: file.name,
      });
    }
    archive.on('error', (err) => {
      console.error(err);
    });
    await archive.finalize();    
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
    @Res() res: Response,
  ) {

    const file = await this.googleDriveService.findFileByTicket(tkt_code);

    if (!file) {
      throw new NotFoundException('Guía no encontrada');
    }

    const stream = await this.googleDriveService.downloadFile(file.id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.name}"`,
    });

    stream.pipe(res);
  }

  @Get('export/excel')
  async exportExcel(@Query() filters: TickFilterDto, @Req() req) {
    return this.tickService.searchForExcel(filters, req.user);
  }

  @Post('all-codes')
  async getAllTickCodes(@Body() filters: TickFilterDto, @Req() req) {
    const codes = await this.tickService.searchAllCodes(filters, req.user);
    return codes;
  }

  @Post('check-tkt-codes')
  async checkTktCodesByArray(@Body() body: { tktCodes: string[] }) {
    const tktCodes = body.tktCodes?.map(c => c?.trim()).filter(c => c) || [];

    if (tktCodes.length === 0) {
      return { existing: [], missing: [] };
    }

    const basePath = join(process.cwd(), 'uploads');
    const existing: string[] = [];
    const missing: string[] = [];

    for (const code of tktCodes) {
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
