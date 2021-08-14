import { ClientMap } from '../../../modules/clients/mapper/ClientMap';
import { IOrderPopulated, IOrder } from './../schemas/Order';
import {ObjectId} from 'mongodb'

class OrderMap {
  static toDTO({
    _id,
    client,
    company,
    deliveryAddress,
    orderProducts,
    paymentMethod,
    status,
    totalPrice,
    created_at,
  }: IOrder | IOrderPopulated): IOrder | IOrderPopulated {
    const order = {
      _id,
      client: ObjectId.isValid(client as any) ? client : ClientMap.toDTO(client as any),
      company,
      created_at,
      deliveryAddress,
      orderProducts: orderProducts.map(o => ({
        _id: o._id,
        amount: o.amount,
        comment: o.comment,
        pickedOptions: o.pickedOptions,
        product: {
          _id: o.product._id,
          imageUrl: o.product.imageUrl
          ? process.env.disk === 'local'
            ? o.product.imageUrl.includes(process.env.APP_API_URL) ? o.product.imageUrl : `${process.env.APP_API_URL}/products/${o.product.imageUrl}`
            : o.product.imageUrl.includes(process.env.WASABI_BUCKET_URL) ? o.product.imageUrl : `${process.env.WASABI_BUCKET_URL}/products/${o.product.imageUrl}`
          : undefined,
          name: o.product.name,
          price: o.product.price,
        },
      })),
      paymentMethod,
      status,
      totalPrice
    };

    return order as IOrderPopulated | IOrder;
  }
}

export { OrderMap };
