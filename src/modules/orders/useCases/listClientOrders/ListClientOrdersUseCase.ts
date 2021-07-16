import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';
import { IPagination } from '../../../../utils/pagination';
import { IOrder } from '../../schemas/Order';

type IRequest = {
  clientId: string
  companyId: string
  limit: number
  page: number
}

@injectable()
class ListClientOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({clientId, companyId, limit, page}: IRequest): Promise<IPagination<IOrder>> {
    try {

      const orders = await this.ordersRepository.find({ where: {clientId, companyId}, limit, page});
      return orders;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListClientOrdersUseCase };
