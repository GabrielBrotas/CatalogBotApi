import { container } from 'tsyringe';

import { ICompaniesRepository } from '../../modules/companies/repositories/ICompaniesRepository';
import { CompaniesRepository } from '../../modules/companies/repositories/implementations/CompaniesRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { ClientsRepository } from '../../modules/clients/repositories/implementations/ClientsRepository';
import { IClientsRepository } from '../../modules/clients/repositories/IClientsRepository';
import { IOrdersRepository } from '../../modules/orders/repositories/IOrdersRepository';
import { OrdersRepository } from '../../modules/orders/repositories/implementations/OrdersRepository';
import { ICategoriesRepository } from '../../modules/products/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/products/repositories/implementations/CategoriesRepository';

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
