
import { IAddress } from "../../clients/schemas/Client";
import { IOrder, IOrderProduct, IPaymentMethods, Order, } from "../entities/Order";

export interface ICreateOrderDTO {
  clientId: string;
  companyId: string;
  orderProducts: IOrderProduct[];
  totalPrice: number;
  comment?: string;
  deliveryAddress: IAddress;
  paymentMethod: IPaymentMethods;
}

export interface IOrdersRepository {
  findById(_id: string): Promise<IOrder | null>;
  create(data: ICreateOrderDTO): Promise<void>;
  listByCompanyId(companyId: string): Promise<IOrder[]>;
  cancelById(orderId: string): Promise<IOrder>;
}
