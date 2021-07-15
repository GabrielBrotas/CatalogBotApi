import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ProductMap } from '../../mapper/ProductMap';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { IProduct } from '../../schemas/Product';

@injectable()
class GetProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(_id: string): Promise<IProduct> {
    const product = await this.productsRepository.findById(_id);

    if (!product) throw new AppError('product not found', 404);

    return ProductMap.toDTO(product);

  }
}

export { GetProductUseCase };
