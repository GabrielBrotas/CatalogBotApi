import { container } from 'tsyringe';

import { ICompaniesRepository } from '../../modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '../../modules/companies/repositories/implementations/CompaniesRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { ClientsRepository } from '../../modules/clients/repositories/implementations/ClientsRepository';
import { IClientsRepository } from '../../modules/clients/repositories/IClientsRepository';
import { IOrdersRepository } from '../../modules/orders/repositories/IOrdersRepository';
import { OrdersRepository } from '../../modules/orders/repositories/implementations/OrdersRepository';
import { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/categories/repositories/implementations/CategoriesRepository';
import { ICartsRepository } from '../../modules/orders/repositories/ICartRepository';
import { CartsRepository } from '../../modules/orders/repositories/implementations/CartsRepository';
import { INotificationsRepository } from '../../modules/notifications/repositories/INotificationsRepository';
import { NotificationsRepository } from './../../modules/notifications/repositories/implementations/NotificationsRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<ICartsRepository>(
  'CartsRepository',
  CartsRepository,
);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
