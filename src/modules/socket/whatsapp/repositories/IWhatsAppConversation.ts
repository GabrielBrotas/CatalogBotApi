import { IWhatsAppConversation } from "../schemas/WhatsAppConversation";

export interface ICreateWhatsAppConversationDTO {
  whatsapp: string;
  companyId: string;
}

export interface IUpdateWhatsAppConversationDTO {
  conversationId: string
  stage: number
}

export interface IWhatsAppConversationRepository {
  create(data: ICreateWhatsAppConversationDTO): Promise<IWhatsAppConversation>;
  updateOne(data: IUpdateWhatsAppConversationDTO): Promise<IWhatsAppConversation>;
  findByWhatsapp(whatsapp: string): Promise<IWhatsAppConversation | null>;
}
