
import { IProduct } from './../schemas/Product';

class ProductMap {
  static toDTO({
    _id,
    category,
    company,
    name,
    options,
    price,
    description,
    imageUrl,
    created_at
  }: IProduct): IProduct {
    const user = {
      _id,
      category,
      company,
      name,
      options,
      price,
      description,
      imageUrl: imageUrl
        ? process.env.disk === 'local'
          ? `${process.env.APP_API_URL}/products/${imageUrl}`
          : `${process.env.AWS_BUCKET_URL}/products/${imageUrl}`
        : undefined,
      created_at
    };
    return user;
  }
}

export { ProductMap };
