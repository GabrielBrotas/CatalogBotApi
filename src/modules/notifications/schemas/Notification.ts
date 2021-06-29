import mongoose, { Schema } from 'mongoose';

export interface INotification {
  _id: string
  Viewed: boolean
  Receiver: string
  Sender: string
  Order?: string;
  Text: string
  Type: 'order'
  CreatedAt: string
  UpdatedAt: string
}

const NotificationSchema = new Schema({
  Viewed: {
    type: Boolean,
    required: true,
  },
  Receiver: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Sender: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref:' Order'
  },
  Text: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
