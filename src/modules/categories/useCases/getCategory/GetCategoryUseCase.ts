import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICategory } from '../../schemas/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class GetCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(_id: string): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(_id);

    if (!category) throw new AppError('category not found', 404);

    return category;
  }
}

export { GetCategoryUseCase };
