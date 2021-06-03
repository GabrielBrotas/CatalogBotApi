import { inject, injectable } from 'tsyringe';

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
  }: IRequest): Promise<void> {
    await this.categoriesRepository.create({
      name,
      companyId,
    });

    return;
  }
}

export { CreateCategoryUseCase };
