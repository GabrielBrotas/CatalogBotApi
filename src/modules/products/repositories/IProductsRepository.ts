import { IPagination } from '../../../utils/pagination';
import { IProduct, IProductOption } from '../schemas/Product';

export interface ICreateProductDTO {
  name: string;
  price: number;
  description?: string;
  options?: IProductOption[];
  companyId: string;
  categoryId: string;
}

export interface IUpdateProductDTO {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  options?: IProductOption[];
}

export interface IUpdateProductImageDTO {
  _id: string;
  imageUrl: string;
}

export interface ListProps {
  page: number;
  limit: number;
  company: string;
  productsId?: string[];
}

export interface IProductsRepository {
  list({ page, limit }: ListProps): Promise<IPagination>;
  create(data: ICreateProductDTO): Promise<IProduct>;
  delete(pid: string): Promise<void>;
  findById(_id: string): Promise<IProduct>;
  updateById(data: IUpdateProductDTO): Promise<IProduct>;
  updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<IProduct>;
}
