import mongoose, { Schema } from 'mongoose';
import { IAddress } from '../../clients/schemas/Client';

type OrderOptionsAdditionals = {
  name: string;
  price: number;
  amount: number
}

export type PickedOptions = {
  productOptionName: string;
  optionAdditionals: OrderOptionsAdditionals[];
};


export type IOrderProduct = {
  productId: string;
  amount: string;
  pickedOptions: PickedOptions[];
};

export type IOrderStatus =
  | 'pending'
  | 'confimed'
  | 'sent'
  | 'received'
  | 'canceled';

export type IPaymentMethods =
  | 'boleto'
  | 'creditCard'
  | 'debit'
  | 'pix'
  | 'money';

export interface IOrder {
  _id: string;
  clientId: string;
  companyId: string;
  orderProducts: IOrderProduct[];
  totalPrice: string;
  comment?: string;
  paymentMethod: IPaymentMethods;
  deliveryAddress: IAddress;
  status: IOrderStatus;
  created_at: Date;
}

const OrderSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  orderProducts: [
    {
      productId: String,
      amount: Number,
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
          ]
        },
      ],
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    neighborhood: {
      type: String,
    },
    number: {
      type: Number,
    },
    cep: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
