import { Router } from 'express';
import { celebrate } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import { AuthenticateClientController } from '../useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '../useCases/createClient/CreateClientController';
import { GetAuthenticatedProfileController } from '../useCases/getAuthenticatedProfile/GetAuthenticatedProfileController';
import { AUTHENTICATE_CLIENT_VALIDATION, CREATE_CLIENT_VALIDATION } from './validations.schema';

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const getAuthenticatedProfileController =
  new GetAuthenticatedProfileController();

const clientsRouter = Router();

clientsRouter.post(
  '/',
  celebrate(CREATE_CLIENT_VALIDATION),
  createClientController.handle,
);

clientsRouter.post(
  '/auth',
  celebrate(AUTHENTICATE_CLIENT_VALIDATION),
  authenticateClientController.handle,
);

clientsRouter.get(
  '/me',
  ensureAuthenticated,
  getAuthenticatedProfileController.handle,
);

export { clientsRouter };
