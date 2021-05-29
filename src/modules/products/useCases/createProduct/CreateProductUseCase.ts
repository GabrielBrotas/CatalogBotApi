import { inject, injectable } from 'tsyringe';
import { Product, ProductOption } from '../../entities/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
  companyId: string;
  name: string;
  price: number;
  categoryId: string
  description?: string;
  options?: ProductOption[];
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    name,
    description,
    price,
    options,
    companyId,
    categoryId
  }: IRequest): Promise<Product> {
    const newProduct = await this.productsRepository.create({
      name,
      description,
      price,
      options,
      companyId,
      categoryId
    });

    return newProduct;
  }
}

export { CreateProductUseCase };
