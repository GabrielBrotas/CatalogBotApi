import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Order } from '../../entities/Order';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';

@injectable()
class ListCompanyOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(companyId: string): Promise<Order[]> {
    try {
      const orders = await this.ordersRepository.listByCompanyId(companyId);
      return orders;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCompanyOrdersUseCase };
