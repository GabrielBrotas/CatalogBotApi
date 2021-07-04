import { IWhatsAppConversation, WhatsAppConversation } from '../../schemas/WhatsAppConversation'
import { IWhatsAppConversationRepository, ICreateWhatsAppConversationDTO, IUpdateWhatsAppConversationDTO } from '../IWhatsAppConversation';

export class WhatsAppConversationRepository implements IWhatsAppConversationRepository {
  private repository;

  constructor() {
    this.repository = WhatsAppConversation;
  }

  async create({ companyId, whatsapp }: ICreateWhatsAppConversationDTO): Promise<IWhatsAppConversation> {
    const newUser = await this.repository.create({
      whatsapp,
      company: companyId,
      stage: 0
    })

    const user = await this.repository.findOne({_id: newUser._id }).populate(['company']).exec()

    if(!user) throw "user not found"

    return user
  }

  async findByWhatsapp(whatsapp: string): Promise<IWhatsAppConversation | null> {
    const user = await this.repository.findOne({whatsapp}).populate(['company']).exec()

    if(!user) return null

    return user
  }

  async updateOne({conversationId, stage}: IUpdateWhatsAppConversationDTO): Promise<IWhatsAppConversation> {
    const user = await this.repository.findOne({_id: conversationId}).exec()

    if(!user) throw "user not found"

    user.stage = stage

    await user.save()

    return user
  }
}
