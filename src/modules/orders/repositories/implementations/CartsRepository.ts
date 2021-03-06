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
import { Cart, ICart, ICartPopulated } from '../../schemas/Cart';

export class CartsRepository implements ICartsRepository {
  private repository;

  constructor() {
    this.repository = Cart;
  }

  async findById({ cartId }: FindByIdDTO): Promise<ICartPopulated | null> {
    const cart = await this.repository
      .findOne({
        _id: cartId,
      })
      .populate(['product']);

    if (!cart) return null;
    return cart;
  }

  async findOne({ clientId, companyId }: FindOneDTO): Promise<ICartPopulated | null> {
    const cart = await this.repository
      .findOne({
        clientId,
        companyId,
      })
      .populate('orderProducts.product');

    if (!cart) return null;

    return cart;
  }

  async insert({
    clientId,
    companyId,
    orderProduct,
  }: InsertOneDTO): Promise<ICartPopulated> {
    const cart = await this.repository.findOne({
      clientId,
      companyId,
    });

    if (!cart) {
      await this.repository.create({
        clientId,
        companyId,
        orderProducts: [orderProduct],
      });

      const userCart = await this.findOne({ clientId, companyId });
      if (!userCart) throw new AppError('Something went wrong', 500);
      return userCart as any;
    }

    cart.orderProducts = cart.orderProducts.concat(orderProduct);
    await cart.save();

    const userCart = await this.findOne({ clientId, companyId })
    if (!userCart) throw new AppError('Something went wrong', 500);
    return userCart
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

  async deleteProductFromCarts(productId: string): Promise<void> {
    const carts = await this.repository.find({'orderProducts.product': productId})

    carts.map(async (cart) => {
      const orderProducts = cart.orderProducts.filter(product => String(product.product) !== String(productId))

      if(orderProducts.length > 0) {
        cart.orderProducts =orderProducts
        await cart.save()
      } else {
        await this.repository.deleteOne({ _id: cart._id });
      }
    })

    return
  }
}
