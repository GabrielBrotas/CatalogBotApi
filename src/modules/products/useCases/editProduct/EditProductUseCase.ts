import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IProduct, IProductOption } from '../../schemas/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { ProductMap } from '../../mapper/ProductMap';
import { IStorageProvider } from '../../../../shared/container/Providers/StorageProvider/IStorageProvider';

interface IRequest {
  productId: string;
  companyId: string;
  name: string;
  price: number;
  description?: string;
  options?: IProductOption[];
  categoryId: string;
  removeImage?: boolean;
}

@injectable()
class EditProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    productId,
    name,
    description,
    price,
    options,
    companyId,
    categoryId,
    removeImage
  }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(productId);
    if (String(product.company._id) !== String(companyId))
      throw new AppError('Not authorized to edit this product', 403);


    if (removeImage && product && product.imageUrl) {
      await this.storageProvider.delete(product.imageUrl, 'products')

      await this.productsRepository.updateProductImage({
        _id: product._id,
        imageUrl: undefined,
      });
    }

    const productUpdated = await this.productsRepository.updateById({
      name,
      description,
      price,
      options,
      _id: productId,
      categoryId,
    });

    return ProductMap.toDTO(productUpdated);
  }
}

export { EditProductUseCase };
