import { Address } from "../../clients/entities/Client";
import { Order, OrderProduct, PaymentMethods } from "../entities/Order";

export interface ICreateOrderDTO {
  clientId: string;
  companyId: string;
  orderProducts: OrderProduct[];
  totalPrice: number;
  comment?: string;
  deliveryAddress: Address;
  paymentMethod: PaymentMethods;
}

export interface IOrdersRepository {
  findById(_id: string): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  listByCompanyId(companyId: string): Promise<Order[]>;
  cancelById(orderId: string): Promise<Order>;
}
