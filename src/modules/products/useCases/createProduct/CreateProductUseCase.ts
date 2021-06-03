import { inject, injectable } from 'tsyringe';
import { IProduct, ProductOption } from '../../schemas/Product';
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
  }: IRequest): Promise<void> {
    await this.productsRepository.create({
      name,
      description,
      price,
      options,
      companyId,
      categoryId
    });

    return;
  }
}

export { CreateProductUseCase };
