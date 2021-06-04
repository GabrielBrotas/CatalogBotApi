import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { deleteFile } from '../../../../utils/file';
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
  ) {}

  async execute({ productId, companyId }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new AppError('product not found', 404);
    if (String(product.company._id) !== String(companyId))
      throw new AppError('not authorized', 403);

    if (product && product.imageUrl) {
      await deleteFile(`./tmp/${product.imageUrl}`);
    }

    await this.productsRepository.delete(product._id);
    return;
  }
}

export { DeleteProductUseCase };
