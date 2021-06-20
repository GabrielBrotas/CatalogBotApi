import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../../companies/schemas/Company';

export type IOptionAdditional = {
  name: string;
  price: number;
};

export type IProductOption = {
  name: string;
  isRequired: boolean;
  maxQuantity: number;
  minQuantity: number;
  additionals: IOptionAdditional[];
};

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description?: string;
  company: ICompany;
  category: string;
  imageUrl?: string;
  options: IProductOption[];
  created_at: Date;
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  imageUrl: String,
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      isRequired: {
        type: String,
        required: true,
      },
      maxQuantity: {
        type: String,
        required: true,
      },
      minQuantity: {
        type: String,
        required: true,
      },
      additionals: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
