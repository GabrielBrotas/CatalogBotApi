import mongoose, { Schema, Document } from 'mongoose';

export type WorkTime = {
  day: number;
  from: string;
  to: string;
};

export interface ICompany {
  _id: string;
  email: string;
  password?: string;
  name: string;
  mainImageUrl?: string;
  workTime?: WorkTime[];
  shortDescription?: string;
  benefits: string[];
  roles: ['company'];
  created_at: Date;
}

const CompanySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  mainImageUrl: String,
  workTime: [
    {
      day: {
        type: Number,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
  ],
  shortDescription: String,
  benefits: [String],
  roles: [String],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
