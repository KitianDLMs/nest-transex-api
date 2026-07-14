import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';

@Injectable()
export class GoogleDriveService {

  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(
        process.cwd(),
        'credentials',
        'guias-homigones-93cd450fe8d9.json'
      ),
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly'
      ],
    });

    this.drive = google.drive({
      version: 'v3',
      auth,
    });
  }

  async listFiles() {
    const response = await this.drive.files.list({
      corpora: 'drive',
      driveId: '0ALghbk_R9Yp5Uk9PVA',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,

      pageSize: 20,
      fields: 'files(id,name,mimeType)',
    });
    return response.data.files;
  }
  // https://drive.google.com/drive/u/1/folders/0ALghbk_R9Yp5Uk9PVA
  // https://drive.google.com/drive/u/1/folders/0ALghbk_R9Yp5Uk9PVA?q=after:2026-01-01%20parent:0ALghbk_R9Yp5Uk9PVA
  async findFileByTicket(tkt_code: string) {
    const response = await this.drive.files.list({
      corpora: 'drive',
      driveId: '0ALghbk_R9Yp5Uk9PVA',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,

      q: `name='${tkt_code}.pdf' and mimeType='application/pdf'`,

      fields: 'files(id,name)',
      pageSize: 1,
    });
    return response.data.files?.[0];
  }

  async downloadFile(fileId: string) {
    const response = await this.drive.files.get(
      {
        fileId,
        alt: 'media',
        supportsAllDrives: true,
      },
      {
        responseType: 'stream',
      },
    );

    return response.data;
  }

  async findFilesByTickets(tktCodes: string[]) {

    const existing: { id: string; name: string }[] = [];
    const missing: string[] = [];

    for (const code of tktCodes) {

      const file = await this.findFileByTicket(code);

      if (file) {
        existing.push(file);
      } else {
        missing.push(code);
      }

    }

    return {
      existing,
      missing,
    };
  }

  async checkFilesByTickets(tktCodes: string[]) {
    const existing: string[] = [];
    const missing: string[] = [];

    for (const code of tktCodes) {

      const file = await this.findFileByTicket(code);

      if (file) {
        existing.push(code);
      } else {
        missing.push(code);
      }

    }
    return {
      existing,
      missing
    };
  }
}