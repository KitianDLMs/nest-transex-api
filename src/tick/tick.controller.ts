import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFile, Res, Query, HttpException, HttpStatus, NotFoundException, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { TickService } from './tick.service';
import { CreateTickDto } from './dto/create-tick.dto';
import { UpdateTickDto } from './dto/update-tick.dto';
import { join, resolve } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import * as archiver from 'archiver';
import { TickFilterDto } from './dto/tick-filter.dto';
import { DownloadZipDto } from './dto/download-zip.dto';
import { tmpdir } from 'os';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Tick } from './entities';
import { In, Repository } from 'typeorm';

@UseGuards(AuthGuard('jwt'))
@Controller('tick')
export class TickController {
  constructor(
    private readonly tickService: TickService,
    @InjectRepository(Tick)
    private tickRepository: Repository<Tick>
  ) {}

  @Get('search')
  async search(@Query() filters: TickFilterDto, @Req() req) {
    return this.tickService.search(filters, req.user);
  }

  @Post('download-zip')
  async downloadZip(
    @Body() body: DownloadZipDto,
    @Req() req: any,      
    @Res() res: Response
  ) {
    const user = req.user;
    if (!user?.projects || user.projects.length === 0) {
      return res.status(403).json({ message: 'El usuario no tiene proyectos asignados' });
    }

    const basePath = join(process.cwd(), 'uploads');
    let tktCodes = body.tktCodes?.map(c => c?.trim()).filter(c => c);

    if (!tktCodes || tktCodes.length === 0) {
      return res.status(400).json({ message: 'No hay tickets', missing: [] });
    }

    const tickets = await this.tickRepository.find({
      where: {
        tkt_code: In(tktCodes),
      },
      select: ['tkt_code', 'project_code'],
    });

    const allowedTktCodes = tickets
      .filter(t => t.project_code && user.projects.includes(t.project_code.trim()))
      .map(t => t.tkt_code);

    if (allowedTktCodes.length === 0) {
      return res.status(403).json({
        message: 'No hay tickets disponibles para este usuario',
        missing: tktCodes
      });
    }

    const existing: string[] = [];
    const missing: string[] = [];

    for (const code of allowedTktCodes) {
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

    const zipName = `documentos_${Date.now()}.zip`;
    const tmpPath = join(tmpdir(), zipName);

    const output = fs.createWriteStream(tmpPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);

    existing.forEach(code => {
      const filePath = join(basePath, `${code}.pdf`);
      archive.file(filePath, { name: `${code}.pdf` });
    });

    archive.finalize();

    output.on('close', () => {
      if (missing.length > 0) {
        res.setHeader('X-Missing-Files', missing.join(','));
      }
      res.download(tmpPath, zipName, (err) => {
        if (err) console.error(err);
        fs.unlinkSync(tmpPath);
      });
    });
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
  async exportExcel(@Query() filters: TickFilterDto, @Req() req) {
    return this.tickService.searchForExcel(filters, req.user);
  }

  @Post('all-codes')
  async getAllTickCodes(@Body() filters: TickFilterDto) {
    const codes = await this.tickService.searchAllCodes(filters);
    return codes;
  }

  @Post('check-tkt-codes')
  async checkTktCodesByArray(
    @Body() body: { tktCodes: string[] },
    @Req() req: any
  ) {
    const user = req.user;

    if (!user?.projects || user.projects.length === 0) {
      return { existing: [], missing: body.tktCodes || [] };
    }

    const tktCodes = body.tktCodes?.map(c => c?.trim()).filter(c => c) || [];
    if (tktCodes.length === 0) {
      return { existing: [], missing: [] };
    }

    const tickets = await this.tickRepository
      .createQueryBuilder('tick')
      .select(['tick.tkt_code', 'ordr.proj_code'])
      .innerJoin('ordr', 'ordr', 'tick.order_code = ordr.order_code AND tick.order_date = ordr.order_date')
      .where('tick.tkt_code IN (:...tktCodes)', { tktCodes })
      .andWhere('ordr.proj_code IN (:...userProjects)', { userProjects: user.projects })
      .getRawMany();

    const allowedTktCodes = tickets.map(t => t.tick_tkt_code);

    const basePath = join(process.cwd(), 'uploads');
    const existing: string[] = [];
    const missing: string[] = [];

    for (const code of allowedTktCodes) {
      const filePath = join(basePath, `${code}.pdf`);
      if (fs.existsSync(filePath)) existing.push(code);
      else missing.push(code);
    }

    const notAllowed = tktCodes.filter(c => !allowedTktCodes.includes(c));

    return { existing, missing: [...missing, ...notAllowed] };
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
