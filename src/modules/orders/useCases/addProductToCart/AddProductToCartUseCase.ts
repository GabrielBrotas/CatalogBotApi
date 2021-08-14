import { ICartPopulated } from './../../schemas/Cart';
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import {
  InsertOneDTO,
  ICartsRepository,
} from '../../repositories/ICartRepository';

import { CartMap } from '../../../../modules/orders/mapper/CartMap';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { ICompaniesRepository } from '../../../companies/repositories/ICompaniesRepository';

@injectable()
class AddProductToCartUseCase {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    clientId,
    companyId,
    orderProduct,
  }: InsertOneDTO): Promise<ICartPopulated> {
    try {
      const company = await this.companiesRepository.findById(companyId);

      if (!company) throw new AppError('company not found', 404);

      const product = await this.productsRepository.findById(
        orderProduct.product,
      );
      if (!product) throw new AppError('Invalid product', 500);

      const cart = await this.cartsRepository.insert({
        clientId,
        companyId,
        orderProduct,
      });

      return CartMap.toDTO(cart);
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { AddProductToCartUseCase };
