import { ICategory } from '../schemas/Category';

export interface ICreateCategoryDTO {
  name: string;
  companyId: string;
}

export interface IEditCategoryDTO {
  categoryId: string;
  name: string;
}

export interface ICategoriesRepository {
  listMy(_id: string): Promise<ICategory[]>;
  findById(_id: string): Promise<ICategory | null>;
  deleteOne(_id: string): Promise<void>;
  create({ name, companyId }: ICreateCategoryDTO): Promise<void>;
  update({ name, categoryId }: IEditCategoryDTO): Promise<ICategory>;
}
