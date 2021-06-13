import { AppError } from '../../../../shared/errors/AppError';
import { IOrder, Order } from '../../entities/Order';
import { ICreateOrderDTO, IOrdersRepository } from '../IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private repository;

  constructor() {
    this.repository = Order;
  }

  async findById(_id: string): Promise<IOrder | null> {
    const order = await this.repository.findOne({ _id });
    if (!order) return null;
    return order;
  }

  async create({
    clientId,
    companyId,
    deliveryAddress,
    orderProducts,
    totalPrice,
    paymentMethod,
  }: ICreateOrderDTO): Promise<IOrder> {
    const order = await this.repository.create({
      clientId,
      companyId,
      deliveryAddress,
      orderProducts,
      totalPrice,
      status: 'pending',
      paymentMethod,
    });

    return order;
  }

  async listByCompanyId(companyId: string): Promise<IOrder[]> {
    const orders = await this.repository.find({ companyId: companyId }).exec();
    return orders;
  }

  async cancelById(orderId: string): Promise<IOrder> {
    try {
      const order = await this.repository.findOne({ _id: orderId});

      if (!order) throw new AppError('Order not found', 404);

      order.status = 'canceled';

      await order.save();
      return order;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
