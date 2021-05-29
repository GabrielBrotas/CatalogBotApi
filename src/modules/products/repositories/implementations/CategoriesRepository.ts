import { getMongoRepository, MongoRepository } from 'typeorm';
import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
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
}
