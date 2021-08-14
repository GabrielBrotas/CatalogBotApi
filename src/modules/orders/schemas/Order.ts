import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { IAddress, IClient } from '../../clients/schemas/Client';

type OrderOptionsAdditionals = {
  name: string;
  price: number;
  amount: number;
};

export type PickedOptions = {
  productOptionName: string;
  optionAdditionals: OrderOptionsAdditionals[];
};

export type IOrderProduct = {
  _id?: string;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  amount: string;
  pickedOptions: PickedOptions[];
  comment?: string;
};

export type IOrderStatus =
  | 'pending'
  | 'confirmed'
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
  client: string | ObjectId;
  company: string;
  orderProducts: IOrderProduct[];
  totalPrice: string;
  paymentMethod: IPaymentMethods;
  deliveryAddress: IAddress;
  status: IOrderStatus;
  created_at: Date;
}

export interface IOrderPopulated {
  _id: string;
  client: IClient;
  company: string;
  orderProducts: IOrderProduct[];
  totalPrice: string;
  paymentMethod: IPaymentMethods;
  deliveryAddress: IAddress;
  status: IOrderStatus;
  created_at: Date;
}

const OrderSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  orderProducts: [
    {
      product: {
        _id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        imageUrl: String,
        price: {
          type: Number,
          required: true,
        },
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
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    cep: {
      type: String,
      required: true,
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
