import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../../../companies/schemas/Company';

export type IWhatsAppConversation = {
  _id: string
  whatsapp: string;
  stage: number;
  company: ICompany
  created_at: string;
}

const WhatsAppConversationSchema = new Schema({
  whatsapp: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
  company: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company'
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const WhatsAppConversation = mongoose.model<IWhatsAppConversation>('WhatsAppConversation', WhatsAppConversationSchema);
