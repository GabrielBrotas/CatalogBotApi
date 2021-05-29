import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Order } from '../../entities/Order';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';

interface IDeleteOrderDTO {
  userId: string;
  orderId: string;
}

@injectable()
class DeleteOrderUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({ orderId, userId }: IDeleteOrderDTO): Promise<Order> {
    try {
      const order = await this.ordersRepository.findById(orderId);

      if (!order) throw new AppError('Order not found', 404);
      if (order.clientId !== userId && order.companyId !== userId)
        throw new AppError('Not authorized', 404);

      const canceledOrder = await this.ordersRepository.cancelById(order._id);

      return canceledOrder
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { DeleteOrderUseCase };
