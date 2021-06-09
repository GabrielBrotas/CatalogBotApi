import { Router } from 'express';
import { celebrate } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

import {
  CREATE_CATEGORY_VALIDATION,
  DELETE_CATEGORY_VALIDATION,
  GET_CATEGORY_VALIDATION,
  LIST_CATEGORIES_VALIDATION,
  UPDATE_CATEGORY_VALIDATION,
} from './validations.schema';
import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../useCases/listCategories/ListCategoriesController';
import { DeleteCategoryController } from '../useCases/deleteCategory/DeleteCategoryController';
import { EditCategoryController } from '../useCases/editCategory/EditProductController';
import { GetCategoryController } from '../useCases/getCategory/GetCategoryController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const celeteCategoryController = new DeleteCategoryController();
const editCategoryController = new EditCategoryController();
const getCategoryController = new GetCategoryController();

categoriesRouter.get(
  '/:companyId',
  celebrate(LIST_CATEGORIES_VALIDATION),
  listCategoriesController.handle,
);

categoriesRouter.get(
  '/category/:cId',
  celebrate(GET_CATEGORY_VALIDATION),
  ensureAuthenticated,
  getCategoryController.handle,
);

categoriesRouter.post(
  '/',
  celebrate(CREATE_CATEGORY_VALIDATION),
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRouter.put(
  '/:cId',
  celebrate(UPDATE_CATEGORY_VALIDATION),
  ensureAuthenticated,
  editCategoryController.handle,
);

categoriesRouter.delete(
  '/:cId',
  celebrate(DELETE_CATEGORY_VALIDATION),
  ensureAuthenticated,
  celeteCategoryController.handle,
);

export { categoriesRouter };
