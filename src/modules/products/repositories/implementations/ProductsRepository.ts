import { AppError } from '../../../../shared/errors/AppError';
import { Product, IProduct } from '../../schemas/Product';
import {
  ICreateProductDTO,
  IProductsRepository,
  IUpdateProductDTO,
  IUpdateProductImageDTO,
} from '../IProductsRepository';

export class ProductsRepository implements IProductsRepository {
  private repository;

  constructor() {
    this.repository = Product;
  }

  async list(): Promise<IProduct[]> {
    const products = await this.repository.find();
    return products;
  }

  async create({
    name,
    price,
    description,
    options,
    companyId,
    categoryId,
  }: ICreateProductDTO): Promise<void> {
    await this.repository.create({
      name,
      price,
      description,
      options,
      companyId,
      categoryId,
    });
    return;
  }

  async delete(_id: string): Promise<void> {
    await this.repository.deleteOne({ _id });
    return;
  }

  async findById(_id: string): Promise<IProduct> {
    const product = await this.repository.findOne({ _id });

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }

  async updateById({
    _id,
    description,
    name,
    options,
    price,
    categoryId,
  }: IUpdateProductDTO): Promise<IProduct> {
    const product = await this.repository.findOne({ _id });

    if (!product) throw new AppError('Product not found', 404);

    product.name = name;
    product.price = price;
    product.categoryId = categoryId;

    if (description) {
      product.description = description;
    }
    if (options) {
      product.options = options;
    }

    await product.save();

    return product;
  }

  async updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<IProduct> {
    const product = await this.repository.findOne({ _id });

    if (!product) throw new AppError('Product not found', 404);

    product.imageUrl = imageUrl;

    await product.save();

    return product;
  }
}
