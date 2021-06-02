import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  companyId: string;
  name: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    companyId,
  }: IRequest): Promise<Category> {
    const newCategory = await this.categoriesRepository.create({
      name,
      companyId,
    });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
