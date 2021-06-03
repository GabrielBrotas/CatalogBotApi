import { AppError } from '../../../../shared/errors/AppError';
import { Category, ICategory } from '../../schemas/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IEditCategoryDTO,
} from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository;

  constructor() {
    this.repository = Category;
  }

  async create({ name, companyId }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      companyId,
    });
  }

  async update({ name, categoryId }: IEditCategoryDTO): Promise<ICategory> {
    const category = await this.repository.findOne({ _id: categoryId});

    if (!category) throw new AppError('Category not found', 404);
    if (name === '' || name === null)
      throw new AppError('Name should not be null', 400);

    category.name = name;

    await category.save();

    return category;
  }

  async listMy(_id: string): Promise<ICategory[]> {
    const categories = await this.repository.find({ companyId: _id });
    return categories;
  }

  async findById(_id: string): Promise<ICategory | null> {
    const category = await this.repository.findOne({ _id });
    if (!category) return null
    return category;
  }

  async deleteOne(_id: string): Promise<void> {
    await this.repository.deleteOne({ _id: _id });
    return;
  }
}
