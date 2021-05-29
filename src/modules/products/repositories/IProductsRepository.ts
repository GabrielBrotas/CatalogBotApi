import { Product, ProductOption } from '../entities/Product';

export interface ICreateProductDTO {
  name: string;
  price: number;
  description?: string;
  options?: ProductOption[];
  companyId: string;
  categoryId: string;
}

export interface IUpdateProductDTO {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  options?: ProductOption[];
}

export interface IUpdateProductImageDTO {
  _id: string;
  imageUrl: string;
}

export interface IProductsRepository {
  list(): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  delete(pid: string): Promise<void>;
  findById(_id: string): Promise<Product>;
  updateById(data: IUpdateProductDTO): Promise<Product>;
  updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<Product>;
}
