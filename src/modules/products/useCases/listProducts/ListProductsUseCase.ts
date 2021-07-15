import { IPagination } from './../../../../utils/pagination';
import { inject, injectable } from 'tsyringe';
import { ProductMap } from '../../mapper/ProductMap';
import {
  IProductsRepository,
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
  }: ListProductsProps): Promise<IPagination> {
    const products = await this.productsRepository.list({
      page,
      limit,
      company: companyId,
    });

    return {
      next: products.next,
      previous: products.previous,
      total: products.total,
      results: products.results.map(p => ProductMap.toDTO(p)),
    };

  }
}

export { ListProductsUseCase };
