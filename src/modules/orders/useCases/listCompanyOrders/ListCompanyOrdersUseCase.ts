import { IOrderPopulated } from '../../schemas/Order';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IOrdersRepository } from '../../repositories/IOrdersRepository';
import { IPagination } from '../../../../utils/pagination';

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

      const orders = await this.ordersRepository.listByCompanyId({_id: companyId, limit, page});
      return orders;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCompanyOrdersUseCase };
