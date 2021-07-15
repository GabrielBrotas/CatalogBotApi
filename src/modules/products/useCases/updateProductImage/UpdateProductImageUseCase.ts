import { inject, injectable } from 'tsyringe';
import { APP_API_URL } from '../../../../config/constants';
import { IStorageProvider } from '../../../../shared/container/Providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { ProductMap } from '../../mapper/ProductMap';
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ imageUrl, _id, companyId }: IRequest) {
    const product = await this.productsRepository.findById(_id);

    if (!product) throw new AppError('product not found', 404);
    if (String(product.company._id) !== String(companyId))
      throw new AppError('not authorized', 403);

    if (product && product.imageUrl) {
      await this.storageProvider.delete(product.imageUrl, 'products')
    }

    await this.storageProvider.save(imageUrl, "products");

    product.imageUrl = imageUrl;

    await this.productsRepository.updateProductImage({
      _id,
      imageUrl,
    });

    return ProductMap.toDTO(product);
  }
}

export { UpdateProductImageUseCase };
