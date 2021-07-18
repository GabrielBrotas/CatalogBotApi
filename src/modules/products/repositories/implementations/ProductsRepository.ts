import { APP_API_URL } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { IPagination, paginateModel } from '../../../../utils/pagination';
import { Product, IProduct } from '../../schemas/Product';
import {
  ICreateProductDTO,
  IProductsRepository,
  IUpdateProductDTO,
  IUpdateProductImageDTO,
  ListProps,
} from '../IProductsRepository';

export class ProductsRepository implements IProductsRepository {
  private repository;

  constructor() {
    this.repository = Product;
  }

  async list({
    page,
    limit,
    company,
    productsId,
  }: ListProps): Promise<IPagination<IProduct>> {
    const startIndex = (page - 1) * limit;

    const results = await paginateModel<IProduct>({page, limit, repository: this.repository, countField: {company: company}})

    results.results = await this.repository
      .find({ company: company as any, ...(productsId && { _id: { $in: productsId } }) })
      .populate(['category', 'company'])
      .skip(startIndex)
      .limit(limit)
      .sort({ created_at: -1 })
      .exec();

    return results;
  }

  async create({
    name,
    price,
    description,
    options,
    companyId,
    categoryId,
  }: ICreateProductDTO): Promise<IProduct> {
    const product = await this.repository.create({
      name,
      price,
      description,
      options,
      company: companyId,
      category: categoryId,
    });
    return product;
  }

  async delete(_id: string): Promise<void> {
    await this.repository.deleteOne({ _id });
    return;
  }

  async findById(_id: string): Promise<IProduct> {
    const product = await this.repository
      .findOne({ _id })
      .populate(['category', 'company']);

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
    product.category = categoryId;

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
    if(!imageUrl) {
      product.imageUrl = undefined
      await product.save();
      return product
    }

    product.imageUrl = imageUrl;

    await product.save();

    return product;
  }
}
