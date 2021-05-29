import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import { DeleteOrderController } from '../useCases/cancelOrder/DeleteOrderController';
import { ListCompanyOrdersController } from '../useCases/companyOrders/ListCompanyOrdersController';
import { CreateOrderController } from '../useCases/createOrder/CreateOrderController';
import { CREATE_ORDER_VALIDATION } from './validations.schema';

const createOrderController = new CreateOrderController();
const listCompanyOrdersController = new ListCompanyOrdersController();
const deleteOrderController = new DeleteOrderController();

const ordersRouter = Router();

ordersRouter.post(
  '/company/:cId',
  celebrate(CREATE_ORDER_VALIDATION),
  ensureAuthenticated,
  createOrderController.handle,
);
ordersRouter.get('/', ensureAuthenticated, listCompanyOrdersController.handle);
ordersRouter.patch('/:oId', ensureAuthenticated, deleteOrderController.handle);

export { ordersRouter };
