import { inject, injectable } from 'tsyringe';
import {
  IProductsRepository,
  ListProductsResultProps,
} from '../../repositories/IProductsRepository';

interface ListProductsProps {
  page: number;
  limit: number;
  companyId: string;
}
@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    page,
    limit,
    companyId,
  }: ListProductsProps): Promise<ListProductsResultProps> {
    const products = await this.productsRepository.list({
      page,
      limit,
      company: companyId,
    });

    return products;
  }
}

export { ListProductsUseCase };
