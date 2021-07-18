import mongoose, { Schema } from 'mongoose';

export interface IRefreshToken {
  _id: string;
  expiresIn: number;
  company: string;
  created_at: Date;
}

const RefreshTokenSchema = new Schema({
  expiresIn: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: false,
    default: null
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
