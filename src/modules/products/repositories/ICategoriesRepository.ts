import { Category } from '../entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  companyId: string;
}

export interface ICategoriesRepository {
  create({ name, companyId }: ICreateCategoryDTO): Promise<Category>;
}
