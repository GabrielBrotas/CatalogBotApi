import { AppError } from '../../../../shared/errors/AppError';
import {
  ICartsRepository,
  FindOneDTO,
  InsertOneDTO,
  DeleteManyDTO,
  DeleteOneDTO,
  UpdateDTO,
  FindByIdDTO,
} from '../ICartRepository';
import { Cart, ICart } from '../../entities/Cart';

export class CartsRepository implements ICartsRepository {
  private repository;

  constructor() {
    this.repository = Cart;
  }

  async findById({ cartId }: FindByIdDTO): Promise<ICart | null> {
    const cart = await this.repository.findOne({
      _id: cartId,
    });

    if (!cart) return null;
    return cart;
  }

  async findOne({ clientId, companyId }: FindOneDTO): Promise<ICart | null> {
    const cart = await this.repository.findOne({
      clientId,
      companyId,
    });

    if (!cart) return null;

    return cart;
  }

  async insert({
    clientId,
    companyId,
    orderProduct,
  }: InsertOneDTO): Promise<ICart> {
    const cart = await this.repository.findOne({
      clientId,
      companyId,
    });

    if (!cart) {
      console.log('create');
      const order = await this.repository.create({
        clientId,
        companyId,
        orderProducts: [orderProduct],
      });

      return order;
    }

    cart.orderProducts = cart.orderProducts.concat(orderProduct);

    await cart.save();

    return cart;
  }

  async update({ cartId, orderProducts }: UpdateDTO): Promise<ICart> {
    try {
      const cart = await this.repository.findOne({ _id: cartId });

      if (!cart) throw new AppError('Cart not found', 404);

      cart.orderProducts = orderProducts;

      await cart.save();
      return cart;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }

  async deleteAll({ cartId }: DeleteManyDTO): Promise<void> {
    await this.repository.deleteOne({ _id: cartId });
    return;
  }

  async deleteOne({
    cartId,
    orderProductId,
  }: DeleteOneDTO): Promise<ICart | void> {
    const cart = await this.repository.findOne({ _id: cartId });

    if (!cart) return;

    if (cart.orderProducts.length <= 1)
      await this.repository.deleteOne({ _id: cartId });

    cart.orderProducts = cart.orderProducts.filter(
      orderProduct => String(orderProduct._id) !== orderProductId,
    );

    await cart.save();

    return cart;
  }
}
