import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        // local onde as imagens vao ser salvas
        destination: path.resolve(__dirname, '..', '..', 'tmp', folder),
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
