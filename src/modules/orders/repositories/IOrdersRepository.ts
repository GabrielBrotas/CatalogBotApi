
import { IAddress } from "../../clients/schemas/Client";
import { IOrder, IOrderProduct, IPaymentMethods } from "../entities/Order";

export interface ICreateOrderDTO {
  clientId: string;
  companyId: string;
  orderProducts: IOrderProduct[];
  totalPrice: number;
  deliveryAddress: IAddress;
  paymentMethod: IPaymentMethods;
}

export interface IOrdersRepository {
  findById(_id: string): Promise<IOrder | null>;
  create(data: ICreateOrderDTO): Promise<IOrder>;
  listByCompanyId(companyId: string): Promise<IOrder[]>;
  cancelById(orderId: string): Promise<IOrder>;
}
