import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  _id: string;
  imageUrl: string;
  companyId: string;
}

@injectable()
class UpdateProductImageUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ imageUrl, _id, companyId }: IRequest) {
    const product = await this.productsRepository.findById(_id);

    if (!product) throw new AppError('product not found', 404);
    if (product.companyId !== companyId) throw new AppError('not authorized', 403);

    if (product && product.imageUrl) {
      await deleteFile(`./tmp/productsImgs/${product.imageUrl}`);
    }

    product.imageUrl = imageUrl;

    await this.productsRepository.updateProductImage({
      _id,
      imageUrl,
    });

    return product;
  }
}

export { UpdateProductImageUseCase };
