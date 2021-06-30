import mongoose, { Schema } from 'mongoose';

export interface IDataAnalysis {
  _id: string;
  company: string;
  type: 'view' | 'order';
  client: string;
}

const DataAnalysisSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  type: String,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
    default: null,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const DataAnalysis = mongoose.model<IDataAnalysis>('DataAnalysis', DataAnalysisSchema);
