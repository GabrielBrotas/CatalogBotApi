import { AppError } from '../../../../shared/errors/AppError';
import { IPagination, paginateModel } from '../../../../utils/pagination';
import { Category, ICategory } from '../../schemas/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IEditCategoryDTO,
  ListCategoriesResultProps,
  ListMyProps,
} from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository;

  constructor() {
    this.repository = Category;
  }

  async create({ name, companyId }: ICreateCategoryDTO): Promise<void> {
    await this.repository.create({
      name,
      company: companyId,
    });
  }

  async update({ name, categoryId }: IEditCategoryDTO): Promise<ICategory> {
    const category = await this.repository.findOne({ _id: categoryId });

    if (!category) throw new AppError('Category not found', 400);
    if (name === '' || name === null)
      throw new AppError('Name should not be null', 400);

    category.name = name;

    await category.save();

    return category;
  }

  async listMy({ _id, limit, page }: ListMyProps): Promise<IPagination<ICategory>> {
    const startIndex = (page - 1) * limit;

    const results = await paginateModel<ICategory>({page, limit, repository: this.repository, countField: {company: _id}})

    results.results = await this.repository
      .find({ company: _id })
      .skip(startIndex)
      .limit(limit)
      .sort({ created_at: -1 })
      .exec();

    return results;
  }

  async findById(_id: string): Promise<ICategory | null> {
    const category = await this.repository.findOne({ _id });
    if (!category) return null;
    return category;
  }

  async deleteOne(_id: string): Promise<void> {
    await this.repository.deleteOne({ _id: _id });
    return;
  }
}
