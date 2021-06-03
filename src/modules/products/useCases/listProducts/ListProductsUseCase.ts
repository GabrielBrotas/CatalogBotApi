import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../schemas/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<IProduct[]> {
    const products = await this.productsRepository.list();

    return products
  }
}

export { ListProductsUseCase };
