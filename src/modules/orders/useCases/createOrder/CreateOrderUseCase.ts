import { IClientsRepository } from './../../../clients/repositories/IClientsRepository';
import { IOrder } from '../../schemas/Order';
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../../companies/repositories/ICompaniesRepository';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
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

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    clientId,
    companyId,
    deliveryAddress,
    orderProducts,
    totalPrice,
    paymentMethod,
    saveAddressAsDefault = false
  }: ICreateOrderDTO): Promise<IOrder> {
    try {
      const company = await this.companiesRepository.findById(companyId);

      if (!company) throw new AppError('company not found', 404);

      const productsId = orderProducts.map(
        orderProduct => orderProduct.product._id,
      );

      const { results } = await this.productsRepository.list({
        company: companyId,
        limit: 999,
        page: 1,
        productsId,
      });

      if (results.length <= 0) throw new AppError('Invalid product', 500);

      const newOrder = await this.ordersRepository.create({
        clientId,
        companyId,
        deliveryAddress,
        orderProducts,
        totalPrice,
        paymentMethod,
      });

      if(saveAddressAsDefault) {
        this.clientsRepository.update({userId: clientId, set: {defaultAddress: deliveryAddress}})
      }

      return newOrder;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { CreateOrderUseCase };
