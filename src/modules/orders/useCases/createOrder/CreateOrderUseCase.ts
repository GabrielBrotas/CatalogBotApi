import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../../companies/repositories/ICompaniesRepository';
import { Order } from '../../entities/Order';
import {
  ICreateOrderDTO,
  IOrdersRepository,
} from '../../repositories/IOrdersRepository';

@injectable()
class CreateOrderUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    clientId,
    comment,
    companyId,
    deliveryAddress,
    orderProducts,
    totalPrice,
    paymentMethod,
  }: ICreateOrderDTO): Promise<Order> {
    try {
      const company = await this.companiesRepository.findById(companyId);

      if (!company) throw new AppError('company not found', 404);

      const newOrder = await this.ordersRepository.create({
        clientId,
        comment,
        companyId,
        deliveryAddress,
        orderProducts,
        totalPrice,
        paymentMethod,
      });

      return newOrder;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { CreateOrderUseCase };
