import { IOrder, IOrderPopulated } from '../../schemas/Order';
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';
import { OrderMap } from '../../../../modules/orders/mapper/OrderMap';

interface IRequest {
  orderId: string;
  userId: string;
}

@injectable()
class GetOrderUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({ orderId, userId }: IRequest): Promise<IOrderPopulated> {
    try {
      const order = await this.ordersRepository.findById(orderId);

      if (!order) throw new AppError('order not found', 404);

      if (
        String(order.client._id) !== userId &&
        String(order.company) !== userId
      ) {
        throw new AppError('unauthorized', 403);
      }

      return OrderMap.toDTO(order) as IOrderPopulated;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { GetOrderUseCase };
