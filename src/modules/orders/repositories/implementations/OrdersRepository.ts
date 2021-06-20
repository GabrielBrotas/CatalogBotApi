import { AppError } from '../../../../shared/errors/AppError';
import { IPagination, paginateModel } from '../../../../utils/pagination';
import { IOrder, IOrderPopulated, Order } from '../../entities/Order';
import { ICreateOrderDTO, IListByCompanyId, IOrdersRepository } from '../IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private repository;

  constructor() {
    this.repository = Order;
  }

  async findById(_id: string): Promise<IOrderPopulated | null> {
    const order = await this.repository
      .findOne({ _id })
      .populate(['client'])
      .exec();
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
      client: clientId,
      company: companyId,
      deliveryAddress,
      orderProducts,
      totalPrice,
      status: 'pending',
      paymentMethod,
    });

    return order;
  }

  async listByCompanyId({_id, limit, page}: IListByCompanyId): Promise<IPagination> {
    const startIndex = (page - 1) * limit;

    const results = await paginateModel({page, limit, repository: this.repository, countField: {company: _id}})
    console.log(results)
    results.results = await this.repository
      .find({ company: _id })
      .skip(startIndex)
      .limit(limit)
      .sort({ created_at: -1 })
      .populate(['client'])
      .exec();

    return results;
  }

  async cancelById(orderId: string): Promise<IOrder> {
    try {
      const order = await this.repository.findOne({ _id: orderId });

      if (!order) throw new AppError('Order not found', 404);

      order.status = 'canceled';

      await order.save();
      return order;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
