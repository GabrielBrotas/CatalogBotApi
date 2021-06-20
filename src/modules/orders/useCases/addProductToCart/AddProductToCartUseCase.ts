import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICart } from '../../entities/Cart';
import {
  InsertOneDTO,
  ICartsRepository,
} from '../../repositories/ICartRepository';

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
  }: InsertOneDTO): Promise<ICart> {
    try {
      const company = await this.companiesRepository.findById(companyId);

      if (!company) throw new AppError('company not found', 404);

      const product = await this.productsRepository.findById(
        orderProduct.product,
      );

      if (!product) throw new AppError('Invalid product', 500);

      const storagedProduct = await this.cartsRepository.insert({
        clientId,
        companyId,
        orderProduct,
      });

      return storagedProduct;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { AddProductToCartUseCase };
