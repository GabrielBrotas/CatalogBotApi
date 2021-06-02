import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
  IEditCategoryDTO,
} from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: MongoRepository<Category>;

  constructor() {
    this.repository = getMongoRepository(Category);
  }

  async create({ name, companyId }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      companyId,
    });

    await this.repository.save(category);

    return category;
  }

  async update({ name, categoryId }: IEditCategoryDTO): Promise<Category> {
    const category = await this.repository.findOne(categoryId);

    if (!category) throw new AppError('Category not found', 404);
    if (name === '' || name === null)
      throw new AppError('Name should not be null', 400);

    category.name = name;

    await this.repository.save(category);

    return category;
  }

  async listMy(_id: string): Promise<Category[]> {
    const categories = await this.repository.find({ companyId: _id });
    return categories;
  }

  async findById(_id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(_id);
    return category;
  }

  async deleteOne(_id: string): Promise<void> {
    await this.repository.delete({ _id: _id });
    return;
  }
}
