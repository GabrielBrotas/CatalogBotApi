import mongoose, { Schema } from 'mongoose';

export type WorkTime = {
  day: number;
  from: string;
  to: string;
};

export type CompanyPaymentMethods = {
  boleto: boolean;
  creditCard: boolean;
  pix: boolean;
  money: boolean;
  debit: boolean;
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
  acceptedPaymentMethods: CompanyPaymentMethods;
  roles: string[];
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
  acceptedPaymentMethods: {
    boleto: Boolean,
    creditCard: Boolean,
    pix: Boolean,
    money: Boolean,
    debit: Boolean,
  },
  roles: [String],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
