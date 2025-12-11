import { diskStorage } from 'multer';
import { extname } from 'path';

export const tickFileOptions = {
  storage: diskStorage({
    destination: './uploads/tick-docs',
    filename: (req, file, callback) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      callback(null, uniqueName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowed = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!allowed.includes(file.mimetype)) {
      return callback(new Error('Solo se permiten PDF o Excel'), false);
    }

    callback(null, true);
  },
};
