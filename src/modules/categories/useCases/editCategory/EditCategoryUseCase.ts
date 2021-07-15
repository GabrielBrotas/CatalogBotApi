import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICategory } from '../../schemas/Category';
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

  async execute({ categoryId, companyId, name }: IRequest): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) throw new AppError('Category not found', 400);
    if (String(category?.company) !== String(companyId))
      throw new AppError('Not authorized to edit this category', 403);

    const categortUpdated = await this.categoriesRepository.update({
      categoryId,
      name,
    });

    return categortUpdated;
  }
}

export { EditCategoryUseCase };
