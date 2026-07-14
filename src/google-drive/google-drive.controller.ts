import { Controller, Get, Post, Param, Body, Patch, Delete, UseInterceptors, UploadedFile, Res, Query, HttpException, HttpStatus, NotFoundException, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { Response } from 'express';
import * as archiver from 'archiver';
import { DownloadZipDto } from './dto/download-zip.dto';

@Controller('drive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Get('drive-test')
  async testDrive(){
    return this.googleDriveService.listFiles();
  }

  @Get('buscar/:tkt_code')
  async buscar(@Param('tkt_code') tkt_code: string) {
    return await this.googleDriveService.findFileByTicket(tkt_code);
  }

  @Get('download/:tkt_code')
  async download(
    @Param('tkt_code') tkt_code: string,
    @Res() res: Response,
  ) {
    const file = await this.googleDriveService.findFileByTicket(tkt_code);
    if (!file) {
      throw new NotFoundException('Archivo no encontrado');
    }
    const stream = await this.googleDriveService.downloadFile(file.id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.name}"`,
    );
    stream.pipe(res);
  }

  @Post('download-zip')
  async downloadZip(
    @Body() body: DownloadZipDto,
    @Res() res: Response,
  ) {
    const tktCodes = body.tktCodes
      ?.map(c => c.trim())
      .filter(Boolean);
    if (!tktCodes || tktCodes.length === 0) {
      return res.status(400).json({
        message: 'No hay tickets',
      });
    }
    const {
      existing,
      missing,
    } = await this.googleDriveService.findFilesByTickets(tktCodes);
    if (existing.length === 0) {
      return res.status(404).json({
        message: 'No se encontró ningún PDF',
        missing,
      });
    }
    const zipName = `documentos_${Date.now()}.zip`;
      const archive = archiver('zip', {
        zlib: {
          level: 9
        },
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
        const stream =
          await this.googleDriveService.downloadFile(file.id);
        archive.append(stream, {
          name: file.name,
        });
      }
      archive.on('error', err => {
        console.error('ZIP ERROR', err);
      });
      await archive.finalize();
    }

    @Post('check-tkt-codes')
    async checkTktCodesByArray(
      @Body() body: { tktCodes: string[] }
    ) {
      const tktCodes = body.tktCodes
        ?.map(c => c?.trim())
        .filter(Boolean) || [];
      if (tktCodes.length === 0) {
        return {
          existing: [],
          missing: []
        };
      }
      return this.googleDriveService.checkFilesByTickets(tktCodes);
    }
  }