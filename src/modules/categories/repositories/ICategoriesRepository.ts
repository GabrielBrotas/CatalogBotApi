import { IPagination } from '../../../utils/pagination';
import { ICategory } from '../schemas/Category';

export interface ICreateCategoryDTO {
  name: string;
  companyId: string;
}

export interface IEditCategoryDTO {
  categoryId: string;
  name: string;
}

export interface ListMyProps {
  page: number;
  limit: number;
  _id: string;
}

export type ListCategoriesResultProps = {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  total: number;
  results: ICategory[];
};

export interface ICategoriesRepository {
  listMy({ _id, limit, page }: ListMyProps): Promise<IPagination<ICategory>>;
  findById(_id: string): Promise<ICategory | null>;
  deleteOne(_id: string): Promise<void>;
  create({ name, companyId }: ICreateCategoryDTO): Promise<void>;
  update({ name, categoryId }: IEditCategoryDTO): Promise<ICategory>;
}
