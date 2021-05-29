import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Product, ProductOption } from '../../entities/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  productId: string;
  companyId: string;
  name: string;
  price: number;
  description?: string;
  options?: ProductOption[];
  categoryId: string
}

@injectable()
class EditProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    productId,
    name,
    description,
    price,
    options,
    companyId,
    categoryId
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(productId);

    if (product.companyId !== companyId)
      throw new AppError('Not authorized to edit this product', 403);

    const productUpdated = await this.productsRepository.updateById({
      name,
      description,
      price,
      options,
      _id: productId,
      categoryId,
    });

    return productUpdated;
  }
}

export { EditProductUseCase };
