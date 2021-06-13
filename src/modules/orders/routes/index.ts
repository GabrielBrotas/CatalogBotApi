import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';
import { DeleteOrderController } from '../useCases/cancelOrder/DeleteOrderController';
import { ListCompanyOrdersController } from '../useCases/companyOrders/ListCompanyOrdersController';
import { CreateOrderController } from '../useCases/createOrder/CreateOrderController';
import { AddProductToCartController } from '../useCases/addProductToCart/AddProductToCartController';
import { RemoveProductFromCartController } from '../useCases/removeProductFromCart/RemoveProductFromCartController';
import { ClearCartController } from '../useCases/clearCart/clearCartController';
import { UpdateProductCartController } from '../useCases/updateProductsCart/UpdateProductCartController';
import { ListCartController } from '../useCases/listCart/ListCartController';

import {
  CREATE_ORDER_VALIDATION,
  GET_CART_VALIDATION,
  ADD_PRODUCT_TO_CART_VALIDATION,
  UPDATE_CART_VALIDATION,
  DELETE_CART_VALIDATION,
  DELETE_PRODUCT_FROM_CART_VALIDATION,
} from './validations.schema';

const createOrderController = new CreateOrderController();
const listCompanyOrdersController = new ListCompanyOrdersController();
const deleteOrderController = new DeleteOrderController();
const addProductToCartController = new AddProductToCartController();
const removeProductFromCartController = new RemoveProductFromCartController();
const clearCartController = new ClearCartController();
const updateProductCartController = new UpdateProductCartController();
const listCartController = new ListCartController();

const ordersRouter = Router();

ordersRouter.post(
  '/company/:cId',
  celebrate(CREATE_ORDER_VALIDATION),
  ensureAuthenticated,
  createOrderController.handle,
);
ordersRouter.get('/', ensureAuthenticated, listCompanyOrdersController.handle);
ordersRouter.patch('/:oId', ensureAuthenticated, deleteOrderController.handle);

ordersRouter.get(
  '/cart/company/:companyId',
  ensureAuthenticated,
  celebrate(GET_CART_VALIDATION),
  listCartController.handle,
);

ordersRouter.post(
  '/cart/:cId',
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
