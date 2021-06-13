import { APP_API_URL } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { Product, IProduct } from '../../schemas/Product';
import {
  ICreateProductDTO,
  IProductsRepository,
  IUpdateProductDTO,
  IUpdateProductImageDTO,
  ListProps,
  ListProductsResultProps,
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
  }: ListProps): Promise<ListProductsResultProps> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocuments = await this.repository
      .countDocuments({ company })
      .exec();
    const results: ListProductsResultProps = {
      results: [],
      total: totalDocuments,
    };

    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await this.repository
      .find({ company, ...(productsId && { _id: { $in: productsId } }) })
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

    product.imageUrl = `${APP_API_URL}/files/${imageUrl}`;

    await product.save();

    return product;
  }
}
