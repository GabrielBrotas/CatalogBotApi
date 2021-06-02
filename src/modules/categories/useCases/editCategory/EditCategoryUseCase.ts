import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  categoryId: string;
  companyId: string;
  name: string;
}

@injectable()
class EditCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    categoryId,
    companyId,
    name,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (category?.companyId !== companyId)
      throw new AppError('Not authorized to edit this category', 403);

    const categortUpdated = await this.categoriesRepository.update({
      categoryId,
      name,
    });

    return categortUpdated;
  }
}

export { EditCategoryUseCase };
