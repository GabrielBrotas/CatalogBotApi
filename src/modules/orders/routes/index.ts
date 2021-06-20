import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import { CreateOrderController } from '../useCases/createOrder/CreateOrderController';
import { RemoveProductFromCartController } from '../useCases/removeProductFromCart/RemoveProductFromCartController';
import { UpdateProductCartController } from '../useCases/updateProductsCart/UpdateProductCartController';
import { ListCartController } from '../useCases/getCart/ListCartController';
import { ListCompanyOrdersController } from '../useCases/listCompanyOrders/ListCompanyOrdersController';
import { UpdateOrderController } from '../useCases/updateOrder/UpdateOrderController';
import { AddProductToCartController } from '../useCases/addProductToCart/AddProductToCartController';
import { ClearCartController } from '../useCases/clearCart/clearCartController';
import {
  ADD_PRODUCT_TO_CART_VALIDATION,
  CREATE_ORDER_VALIDATION,
  DELETE_CART_VALIDATION,
  DELETE_PRODUCT_FROM_CART_VALIDATION,
  GET_CART_VALIDATION,
  GET_ORDERS_VALIDATION,
  GET_ORDER_VALIDATION,
  UPDATE_CART_VALIDATION,
  UPDATE_ORDER_VALIDATION,
} from './validations.schema';
import { GetOrderController } from '../useCases/getOrder/GetOrderController';

const createOrderController = new CreateOrderController();
const listCompanyOrdersController = new ListCompanyOrdersController();
const updateOrderController = new UpdateOrderController();
const addProductToCartController = new AddProductToCartController();
const removeProductFromCartController = new RemoveProductFromCartController();
const clearCartController = new ClearCartController();
const updateProductCartController = new UpdateProductCartController();
const listCartController = new ListCartController();
const getOrderController = new GetOrderController();

const ordersRouter = Router();

ordersRouter.get('/', ensureAuthenticated, celebrate(GET_ORDERS_VALIDATION), listCompanyOrdersController.handle);

ordersRouter.get(
  '/:orderId',
  ensureAuthenticated,
  celebrate(GET_ORDER_VALIDATION),
  getOrderController.handle,
);

ordersRouter.post(
  '/company/:cId',
  celebrate(CREATE_ORDER_VALIDATION),
  ensureAuthenticated,
  createOrderController.handle,
);
ordersRouter.put('/:oId', ensureAuthenticated, celebrate(UPDATE_ORDER_VALIDATION), updateOrderController.handle);

ordersRouter.get(
  '/cart/company/:companyId',
  ensureAuthenticated,
  celebrate(GET_CART_VALIDATION),
  listCartController.handle,
);

ordersRouter.post(
  '/cart/company/:companyId',
  ensureAuthenticated,
  celebrate(ADD_PRODUCT_TO_CART_VALIDATION),
  addProductToCartController.handle,
);

ordersRouter.put(
  '/cart/:cartId',
  ensureAuthenticated,
  celebrate(UPDATE_CART_VALIDATION),
  updateProductCartController.handle,
);

ordersRouter.delete(
  '/cart/:cartId/:orderProductId',
  ensureAuthenticated,
  celebrate(DELETE_PRODUCT_FROM_CART_VALIDATION),
  removeProductFromCartController.handle,
);

ordersRouter.delete(
  '/cart/:cartId',
  ensureAuthenticated,
  celebrate(DELETE_CART_VALIDATION),
  clearCartController.handle,
);

export { ordersRouter };
