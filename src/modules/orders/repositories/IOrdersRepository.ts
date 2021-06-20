import { IPagination } from './../../../utils/pagination';
import { IPaymentMethods, IOrder, IOrderProduct, IOrderPopulated } from './../entities/Order';
import { IAddress } from './../../clients/schemas/Client';

export interface ICreateOrderDTO {
  clientId: string;
  companyId: string;
  orderProducts: IOrderProduct[];
  totalPrice: number;
  deliveryAddress: IAddress;
  paymentMethod: IPaymentMethods;
}

export interface IListByCompanyId {
  _id: string;
  page: number;
  limit: number;
}

export interface IOrdersRepository {
  findById(_id: string): Promise<IOrderPopulated | null>;
  create(data: ICreateOrderDTO): Promise<IOrder>;
  listByCompanyId({_id, limit, page}: IListByCompanyId): Promise<IPagination>;
  cancelById(orderId: string): Promise<IOrder>;
}
