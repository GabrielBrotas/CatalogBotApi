import { Router } from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import uploadConfig from '../../../config/upload';

import { AuthenticateController } from '../useCases/authentication/AuthenticateController';
import { CreateCompanyController } from '../useCases/createCompany/CreateCompanyController';
import { GetCompanyController } from '../useCases/getCompany/GetCompanyController';
import { GetMyCompanyController } from '../useCases/getMyCompany/GetMyCompanyController';
import { UpdateCompanyController } from '../useCases/updateCompany/UpdateCompanyController';
import { UpdateImageController } from '../useCases/updateImage/UpdateImageController';
import { AddCompanyDataController } from '../useCases/addCompanyData/AddCompanyDataController';
import {
  ADD_COMPANY_DATA_VALIDATION,
  AUTHENTICATE_COMPANY_VALIDATION,
  CREATE_COMPANY_VALIDATION,
  GET_COMPANY_VALIDATION,
  UPDATE_COMPANY_VALIDATION,
} from './validations.schema';
import { ListMyCompanyDataAnalysisController } from '../useCases/listMyCompanyDataAnalysis/ListMyCompanyDataAnalysisController';

const companiesRouter = Router();
const upload = multer(uploadConfig.upload(''));

const createCompanyController = new CreateCompanyController();
const authenticateController = new AuthenticateController();
const getMyCompanyController = new GetMyCompanyController();
const getCompanyController = new GetCompanyController();
const updateCompanyController = new UpdateCompanyController();
const updateImageController = new UpdateImageController();
const addCompanyDataController = new AddCompanyDataController();
const listMyCompanyDataAnalysisController = new ListMyCompanyDataAnalysisController();

companiesRouter.get(
  '/:id',
  celebrate(GET_COMPANY_VALIDATION),
  getCompanyController.handle,
);

companiesRouter.get(
  '/:id/data',
  ensureAuthenticated,
  listMyCompanyDataAnalysisController.handle,
);

companiesRouter.post(
  '/',
  celebrate(CREATE_COMPANY_VALIDATION),
  createCompanyController.handle,
);

companiesRouter.post(
  '/auth',
  celebrate(AUTHENTICATE_COMPANY_VALIDATION),
  authenticateController.handle,
);

companiesRouter.post(
  '/:id/data',
  celebrate(ADD_COMPANY_DATA_VALIDATION),
  addCompanyDataController.handle,
);

companiesRouter.get('/', ensureAuthenticated, getMyCompanyController.handle);

companiesRouter.put(
  '/',
  ensureAuthenticated,
  celebrate(UPDATE_COMPANY_VALIDATION),
  updateCompanyController.handle,
);

companiesRouter.patch(
  '/me/image',
  ensureAuthenticated,
  upload.single('image'),
  updateImageController.handle,
);

export { companiesRouter };
