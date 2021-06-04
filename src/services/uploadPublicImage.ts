import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../shared/middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig.upload(''));
const uploadPublicImage = Router();

uploadPublicImage.post(
  '/single',
  ensureAuthenticated,
  upload.single('image'),
  (req, res) => {
    
  },
);

export { uploadPublicImage };
