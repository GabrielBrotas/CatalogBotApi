import mongoose, { Schema, Document } from 'mongoose';

export type OptionAdditional = {
  _id: string;
  name: string;
  price: number;
};

export type ProductOption = {
  name: string;
  isRequired: boolean;
  maxQuantity: number;
  minQuantity: number;
  additionals: OptionAdditional[];
};

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description?: string;
  companyId: string;
  categoryId: string;
  imageUrl?: string;
  options: ProductOption[];
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
  categoryId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
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
    default: Date.now(),
  },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
