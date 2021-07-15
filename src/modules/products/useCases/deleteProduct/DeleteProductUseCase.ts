import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/container/Providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICartsRepository } from '../../../orders/repositories/ICartRepository';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  companyId: string;
  productId: string;
}

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ productId, companyId }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new AppError('product not found', 404);
    if (String(product.company._id) !== String(companyId))
      throw new AppError('not authorized', 403);

    if (product && product.imageUrl) {
      await this.storageProvider.delete(product.imageUrl, 'products')
    }

    await this.productsRepository.delete(product._id);

    await this.cartsRepository.deleteProductFromCarts(productId)

    return;
  }
}

export { DeleteProductUseCase };
