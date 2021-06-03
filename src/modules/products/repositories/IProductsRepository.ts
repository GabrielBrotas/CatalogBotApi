import {  IProduct, ProductOption } from '../schemas/Product';

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
  list(): Promise<IProduct[]>;
  create(data: ICreateProductDTO): Promise<void>;
  delete(pid: string): Promise<void>;
  findById(_id: string): Promise<IProduct>;
  updateById(data: IUpdateProductDTO): Promise<IProduct>;
  updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<IProduct>;
}
