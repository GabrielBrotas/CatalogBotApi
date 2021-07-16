import { IPagination } from './../../../../utils/pagination';
import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../schemas/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface ListCategorieProps {
  page: number;
  limit: number;
  _id: string;
}

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    _id,
    limit,
    page,
  }: ListCategorieProps): Promise<IPagination<ICategory>> {
    const myCategories = await this.categoriesRepository.listMy({
      _id,
      limit,
      page,
    });
    return myCategories;
  }
}

export { ListCategoriesUseCase };
