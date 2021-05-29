import { getMongoRepository, MongoRepository } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { Order } from '../../entities/Order';
import { ICreateOrderDTO, IOrdersRepository } from '../IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private repository: MongoRepository<Order>;

  constructor() {
    this.repository = getMongoRepository(Order);
  }

  async findById(_id: string): Promise<Order | undefined> {
    const order = await this.repository.findOne(_id);
    return order
  }

  async create({
    clientId,
    companyId,
    comment,
    deliveryAddress,
    orderProducts,
    totalPrice,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      clientId,
      comment,
      companyId,
      deliveryAddress,
      orderProducts,
      totalPrice,
      status: 'pending',
    });

    await this.repository.save(order);

    return order;
  }

  async listByCompanyId(companyId: string): Promise<Order[]> {
    const orders = await this.repository.find({ companyId: companyId });
    return orders;
  }

  async cancelById(orderId: string): Promise<Order> {
    try {
      const order = await this.repository.findOne(orderId);

      if (!order) throw new AppError('Order not found', 404);

      order.status = 'canceled';

      await this.repository.save(order);
      return order;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
