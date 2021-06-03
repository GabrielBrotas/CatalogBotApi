import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
  companyId: string;
  created_at: Date;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
})

export const Category = mongoose.model<ICategory>("Category", CategorySchema)



