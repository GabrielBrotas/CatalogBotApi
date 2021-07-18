import { AppError } from '../../../../shared/errors/AppError';
import { IPagination, paginateModel } from '../../../../utils/pagination';
import { IOrder, IOrderPopulated, Order } from '../../schemas/Order';
import { ICreateOrderDTO, IFindOrdersDTO, IListByCompanyId, IOrdersRepository, IUpdateOrderDTO } from '../IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private repository;

  constructor() {
    this.repository = Order;
  }

  async findById(_id: string): Promise<IOrderPopulated | null> {
    const order = await this.repository
      .findOne({ _id })
      .populate(['client'])
      .exec() as any;
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

  async listByCompanyId({_id, limit, page}: IListByCompanyId): Promise<IPagination<IOrderPopulated>> {
    const startIndex = (page - 1) * limit;

    const results = await paginateModel<any>({page, limit, repository: this.repository, countField: {company: _id}})

    results.results = await this.repository
      .find({ company: _id })
      .skip(startIndex)
      .limit(limit)
      .sort({ created_at: -1  })
      .populate(['client'])
      .exec();

    return results;
  }

  async find({where, limit, page}: IFindOrdersDTO): Promise<IPagination<IOrder>> {
    const {clientId, companyId} = where
    const startIndex = (page - 1) * limit;
    const results = await paginateModel<IOrder>({page, limit, repository: this.repository, countField: { client: clientId, company: companyId }})

    results.results = await this.repository
      .find({ client: clientId, company: companyId})
      .skip(startIndex)
      .limit(limit)
      .sort({ created_at: -1  })
      // .populate(['client'])
      .exec();

    return results;
  }

  async update({orderId, data}: IUpdateOrderDTO): Promise<IOrder> {
    try {
      const order = await this.repository.findOne({ _id: orderId });

      if (!order) throw new AppError('Order not found', 404);

      order.deliveryAddress = data.deliveryAddress
      order.orderProducts = data.orderProducts
      order.totalPrice = data.totalPrice
      order.status = data.status
      order.paymentMethod = data.paymentMethod

      await order.save();
      return order;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
