import { getMongoRepository, MongoRepository } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { Product } from '../../entities/Product';
import {
  ICreateProductDTO,
  IProductsRepository,
  IUpdateProductDTO,
  IUpdateProductImageDTO,
} from '../IProductsRepository';

export class ProductsRepository implements IProductsRepository {
  private repository: MongoRepository<Product>;

  constructor() {
    this.repository = getMongoRepository(Product);
  }

  async list(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  async create({
    name,
    price,
    description,
    options,
    companyId,
    categoryId
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      description,
      options,
      companyId,
      categoryId
    });

    await this.repository.save(product);

    return product;
  }

  async delete(_id: string): Promise<void> {
    await this.repository.delete(_id);
    return;
  }

  async findById(_id: string): Promise<Product> {
    const product = await this.repository.findOne(_id);

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }

  async updateById({
    _id,
    description,
    name,
    options,
    price,
    categoryId
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.repository.findOne(_id);

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

    await this.repository.save(product);

    return product;
  }

  async updateProductImage({
    _id,
    imageUrl,
  }: IUpdateProductImageDTO): Promise<Product> {
    const product = await this.repository.findOne(_id);

    if (!product) throw new AppError('Company not found', 404);

    product.imageUrl = imageUrl;

    await this.repository.save(product);

    return product;
  }
}
