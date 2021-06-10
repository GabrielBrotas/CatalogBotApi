import mongoose, { Schema } from 'mongoose';

export type IAddress = {
  state: string;
  city: string;
  street: string;
  neighborhood?: string;
  number?: string;
  cep: string;
};
export interface IClient {
  _id: string;
  name: string;
  email: string;
  password?: string;
  cellphone: string;
  defaultAddress?: IAddress;
  created_at: Date;
}

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  defaultAddress: {
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
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Client = mongoose.model<IClient>('Client', ClientSchema);
