import mongoose, { Schema } from 'mongoose';
import { IOrderProduct, PickedOptions } from './Order';

export type ICartProduct = {
  _id?: string;
  product: string;
  amount: string;
  pickedOptions: PickedOptions[];
  comment?: string;
};

export interface ICart {
  _id: string;
  clientId: string;
  companyId: string;
  orderProducts: ICartProduct[];
  created_at: Date;
}

const CartSchema = new Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  orderProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      amount: Number,
      comment: {
        type: String,
        required: false,
      },
      pickedOptions: [
        {
          productOptionName: String,
          optionAdditionals: [
            {
              name: {
                type: String,
                required: true,
              },
              price: {
                type: String,
                required: true,
              },
              amount: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
