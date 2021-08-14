import { ProductMap } from '../../../modules/products/mapper/ProductMap';
import { ICartPopulated } from './../schemas/Cart';


class CartMap {
  static toDTO({
    _id,
    clientId,
    companyId,
    created_at,
    orderProducts
  }: ICartPopulated): ICartPopulated {
    const cart = {
      _id,
      clientId,
      companyId,
      created_at,
      orderProducts: orderProducts.map(o => ({
        _id: o._id,
        amount: o.amount,
        comment: o.comment,
        pickedOptions: o.pickedOptions,
        product: ProductMap.toDTO(o.product)
      }))
    };
    return cart;
  }
}

export { CartMap };

