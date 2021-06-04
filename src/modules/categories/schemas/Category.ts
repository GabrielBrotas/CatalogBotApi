import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
  company: string;
  created_at: Date;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Company'
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

export const Category = mongoose.model<ICategory>("Category", CategorySchema)



