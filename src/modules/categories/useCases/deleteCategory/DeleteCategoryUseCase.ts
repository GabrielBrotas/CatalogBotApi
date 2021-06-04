import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  companyId: string;
  categoryId: string;
}

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ categoryId, companyId }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) throw new AppError('category not found', 404);
    if (String(category.company) !== String(companyId))
      throw new AppError('not authorized', 403);

    await this.categoriesRepository.deleteOne(category._id);
    return;
  }
}

export { DeleteCategoryUseCase };
