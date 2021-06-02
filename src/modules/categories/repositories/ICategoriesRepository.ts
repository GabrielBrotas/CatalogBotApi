import { Category } from '../entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  companyId: string;
}

export interface IEditCategoryDTO {
  categoryId: string;
  name: string;
}

export interface ICategoriesRepository {
  listMy(_id: string): Promise<Category[]>;
  findById(_id: string): Promise<Category | undefined>;
  deleteOne(_id: string): Promise<void>;
  create({ name, companyId }: ICreateCategoryDTO): Promise<Category>;
  update({ name, categoryId }: IEditCategoryDTO): Promise<Category>;
}
