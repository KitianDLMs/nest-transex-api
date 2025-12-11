import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private uploadPath = path.join(__dirname, '../../uploads');

  async saveLocalFile(file: Express.Multer.File): Promise<string> {
    await fs.mkdir(this.uploadPath, { recursive: true });

    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadPath, filename);

    await fs.writeFile(filePath, file.buffer);

    return `/uploads/${filename}`;
  }
}
