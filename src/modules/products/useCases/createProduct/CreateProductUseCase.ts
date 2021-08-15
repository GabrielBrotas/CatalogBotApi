import { inject, injectable } from 'tsyringe';
import { IProduct, IProductOption } from '../../schemas/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { ProductMap } from '../../mapper/ProductMap';

interface IRequest {
  companyId: string;
  name: string;
  price: number;
  categoryId: string
  description?: string;
  options?: IProductOption[];
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
  }: IRequest): Promise<IProduct> {
    const newProduct = await this.productsRepository.create({
      name,
      description,
      price,
      options,
      companyId,
      categoryId
    });


    return ProductMap.toDTO(newProduct);
  }
}

export { CreateProductUseCase };
