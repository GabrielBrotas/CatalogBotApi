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
  company: string
}

export type ListProductsResultProps = {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  total: number;
  results: IProduct[];
};

export interface IProductsRepository {
  list({ page, limit }: ListProps): Promise<ListProductsResultProps>;
  create(data: ICreateProductDTO): Promise<IProduct>;
  delete(pid: string): Promise<void>;
  findById(_id: string): Promise<IProduct>;
  updateById(data: IUpdateProductDTO): Promise<IProduct>;
  updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<IProduct>;
}
