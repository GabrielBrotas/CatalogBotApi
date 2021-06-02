import { inject, injectable } from 'tsyringe';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(_id: string): Promise<Category[]> {
    const myCategories = await this.categoriesRepository.listMy(_id);
    return myCategories;
  }
}

export { ListCategoriesUseCase };
