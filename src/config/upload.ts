import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  uploadsFolder: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    // local onde as imagens vao ser salvas
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
