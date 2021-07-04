import { MessageType, WAConnection, proto, Presence } from "@adiwajshing/baileys"
import { WhatsAppConversationRepository } from "../repositories/implementations/WhatsAppConversation"
import { getBotResponse } from "./getBotResponse.service"

const whatsAppConnectionRepository = new WhatsAppConversationRepository()

enum IPresence {
  available = 'available', // "online"
  composing = 'composing', // "typing..."
  recording = 'recording', // "recording..."
  paused = 'paused' // stopped typing, back to "online"
}

function getWhatsappFromSender(sender: string) {
  return sender.split('@')[0]
}
let isSendingMessage = false

export async function sendMessage(conn: WAConnection, messageData: proto.WebMessageInfo) {
  if(isSendingMessage) return

  isSendingMessage = true

  const { key: {remoteJid: sender},  message } = messageData
  const senderPhone = getWhatsappFromSender(String(sender))

  if(!senderPhone && !message) return

  await conn.updatePresence(String(sender), Presence.composing)

  try {
    if(!message?.conversation) {
      await conn.sendMessage (String(sender), 'Descuple, mas só por enquanto só consigo responder a mensagens de texto', MessageType.text)
      await conn.updatePresence(String(sender), Presence.available)
      return
    }

    // send message

    let conversation = await whatsAppConnectionRepository.findByWhatsapp(senderPhone)

    if(!conversation) {
      conversation = await whatsAppConnectionRepository.create({companyId: conn.companyId, whatsapp: senderPhone})
    }

    const { response, newStage, answerNextStageAutomatically } = await getBotResponse({ userData: conversation, userResponse: message.conversation });

    if(newStage) {
      await whatsAppConnectionRepository.updateOne({conversationId: conversation._id, stage: newStage})
    }

    await conn.sendMessage (String(sender), response, MessageType.text)

    if(answerNextStageAutomatically) {
      const { response, newStage, answerNextStageAutomatically } = await getBotResponse({ userData: {...conversation, stage: conversation.stage +1}, userResponse: message.conversation });

      if(newStage) {
        await whatsAppConnectionRepository.updateOne({conversationId: conversation._id, stage: newStage})
      }

      await conn.sendMessage (String(sender), response, MessageType.text)
      await conn.updatePresence(String(sender), Presence.available)
    }

    await conn.updatePresence(String(sender), Presence.available)
    isSendingMessage = false
  } catch(err) {
    console.log('sendMessage err = ', err)
    isSendingMessage = true
  }
}
