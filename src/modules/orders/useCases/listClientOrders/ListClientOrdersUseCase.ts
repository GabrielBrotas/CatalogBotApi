import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';
import { IPagination } from '../../../../utils/pagination';
import { IOrder } from '../../schemas/Order';
import { OrderMap } from '../../../../modules/orders/mapper/OrderMap';

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

      const response = await this.ordersRepository.find({ where: {clientId, companyId}, limit, page});
      return {
        ...response,
        results: response.results.map(o => OrderMap.toDTO(o)) as IOrder[]
      }
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListClientOrdersUseCase };
