import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrder } from '../../schemas/Order';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';

interface IRequest {
  userId: string;
  orderId: string;
  orderUpdated: IOrder;
}

@injectable()
class UpdateOrderUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({ orderId, userId, orderUpdated }: IRequest): Promise<IOrder> {
    try {
      const order = await this.ordersRepository.findById(orderId);
      console.log({order})
      if (!order) throw new AppError('Order not found', 404);
      if (String(order.client._id) !== String(userId) && String(order.company) !== String(userId))
        throw new AppError('Not authorized', 404);

      const updatedOrder = await this.ordersRepository.update({orderId, data: orderUpdated})

      return updatedOrder
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { UpdateOrderUseCase };
