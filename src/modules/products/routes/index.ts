import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import uploadConfig from '../../../config/upload';

import { CreateProductController } from '../useCases/createProduct/CreateProductController';
import { EditProductController } from '../useCases/editProduct/EditProductController';
import { UpdateProductImageController } from '../useCases/updateProductImage/UpdateProductImageController';
import { ListProductsController } from '../useCases/listProducts/ListProductsController';
import { DeleteProductController } from '../useCases/deleteProduct/DeleteProductController';
import { GetProductController } from '../useCases/getProduct/GetProductController';
import {
  CREATE_PRODUCT_VALIDATION,
  DELETE_PRODUCT_VALIDATION,
  GET_PRODUCT_VALIDATION,
  LIST_PRODUCT_VALIDATION,
  UPDATE_PRODUCT_VALIDATION,
} from './validations.schema';

const productsRouter = Router();
const upload = multer(uploadConfig.upload(''));

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const editProductController = new EditProductController();
const updateProductImageController = new UpdateProductImageController();
const getProductController = new GetProductController();

productsRouter.get(
  '/:companyId',
  celebrate(LIST_PRODUCT_VALIDATION),
  listProductsController.handle,
);
productsRouter.post(
  '/',
  celebrate(CREATE_PRODUCT_VALIDATION),
  ensureAuthenticated,
  createProductController.handle,
);

productsRouter.get(
  '/product/:pId',
  celebrate(GET_PRODUCT_VALIDATION),
  getProductController.handle,
);

productsRouter.delete(
  '/:pId',
  celebrate(DELETE_PRODUCT_VALIDATION),
  ensureAuthenticated,
  deleteProductController.handle,
);

productsRouter.put(
  '/:pId',
  celebrate(UPDATE_PRODUCT_VALIDATION),
  ensureAuthenticated,
  editProductController.handle,
);

productsRouter.patch(
  '/:pId/image',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      pId: Joi.string().required(),
    },
  }),
  upload.single('image'),
  updateProductImageController.handle,
);

export { productsRouter };
