import { AppError } from '../../../../shared/errors/AppError';
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

    if (!category) throw new AppError('Category not found', 404);
    if (name === '' || name === null)
      throw new AppError('Name should not be null', 400);

    category.name = name;

    await category.save();

    return category;
  }

  async listMy({ _id, limit, page }: ListMyProps): Promise<ICategory[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocuments = await this.repository
      .countDocuments({ company: _id })
      .exec();

    const results: ListCategoriesResultProps = {
      results: [],
      total: totalDocuments,
    };

    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

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
