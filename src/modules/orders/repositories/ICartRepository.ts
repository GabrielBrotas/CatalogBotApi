import { ICart, ICartProduct } from '../schemas/Cart';
import { IOrderProduct } from '../schemas/Order';

export interface FindOneDTO {
  clientId: string;
  companyId: string;
}

export interface FindByIdDTO {
  cartId: string;
}

export interface InsertOneDTO {
  clientId: string;
  companyId: string;
  orderProduct: ICartProduct;
}

export interface UpdateDTO {
  cartId: string;
  orderProducts: ICartProduct[];
}

export interface DeleteManyDTO {
  cartId: string;
}

export interface DeleteOneDTO {
  cartId: string;
  orderProductId: string;
}

export interface ICartsRepository {
  insert(data: InsertOneDTO): Promise<ICart>;
  findById({ cartId }: FindByIdDTO): Promise<ICart | null>;
  findOne({ clientId, companyId }: FindOneDTO): Promise<ICart | null>;
  update(data: UpdateDTO): Promise<ICart>;
  deleteAll({ cartId }: DeleteManyDTO): Promise<void>;
  deleteOne({ cartId, orderProductId }: DeleteOneDTO): Promise<ICart | void>;
}
