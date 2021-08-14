import { IOrderPopulated } from '../../schemas/Order';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';
import { IPagination } from '../../../../utils/pagination';
import { OrderMap } from '../../../../modules/orders/mapper/OrderMap';

type IRequest = {
  companyId: string
  limit: number
  page: number
}

@injectable()
class ListCompanyOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({companyId, limit, page}: IRequest): Promise<IPagination<IOrderPopulated>> {
    try {

      const response = await this.ordersRepository.listByCompanyId({_id: companyId, limit, page});

      return {
        ...response,
        results: response.results.map(o => OrderMap.toDTO(o)) as IOrderPopulated[]
      }
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCompanyOrdersUseCase };
