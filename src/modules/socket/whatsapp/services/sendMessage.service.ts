import { MessageType, WAConnection, proto, Presence } from "@adiwajshing/baileys"
import { sleep } from "../../../../utils/sleep"
import { WhatsAppConversationRepository } from "../repositories/implementations/WhatsAppConversation"
import { IWhatsAppConversation } from "../schemas/WhatsAppConversation"
import { getBotResponse } from "./getBotResponse.service"

const whatsAppConversationRepository = new WhatsAppConversationRepository()

interface SendMessageProps {
  conn: WAConnection,
  messageData: proto.WebMessageInfo,
  companyId: string
}

let isSendingMessage = false

export async function sendMessage({ conn, messageData, companyId }: SendMessageProps) {
  if(isSendingMessage) return
  if(!companyId || !conn) return

  isSendingMessage = true

  const { key: {remoteJid: sender},  message } = messageData

  const senderPhone = getWhatsappFromSender(String(sender))

  if(!senderPhone && !message) return
  try {
    await conn.updatePresence(String(sender), Presence.composing)
    await sleep(3000)

    // se nao for mensagem de texto
    if(!message?.conversation) {
      await conn.updatePresence(String(sender), Presence.available)
      return
    }

    let conversation = await whatsAppConversationRepository.findByWhatsapp(senderPhone)

    if(!conversation) {
      conversation = await whatsAppConversationRepository.create({companyId: companyId, whatsapp: senderPhone})
    }

    await answerUser({conn, conversation, sender: String(sender), userResponse: message.conversation})

    await conn.updatePresence(String(sender), Presence.available)

    isSendingMessage = false
  } catch(err) {
    console.log('sendMessage err = ', err)
    isSendingMessage = false
  }
}

interface AnswerUserProps {
  conn: WAConnection
  conversation: IWhatsAppConversation
  userResponse: string
  sender: string
}

async function answerUser({conn, conversation, userResponse, sender}: AnswerUserProps) {
  try {
    const {answerNextStageAutomatically, response, sendAnotherInfoMessage} = await getBotResponseAndUpdateStage({conversation, userResponse})

    await conn.sendMessage(sender, response, MessageType.text)

    if(sendAnotherInfoMessage) {
      await sleep(1500)
      await conn.sendMessage(sender, sendAnotherInfoMessage, MessageType.text)
    }

    if(answerNextStageAutomatically) {
      await sleep(1500)
      const { response } = await getBotResponseAndUpdateStage({conversation: {...conversation, stage: conversation.stage +1 }, userResponse})
      await conn.sendMessage (String(sender), response, MessageType.text)
    }
  } catch (err) {
    console.log('answer err = ', err)
  }
}

interface GetBotResponseAndUpdateStageProps {
  conversation: IWhatsAppConversation
  userResponse: string
}

async function getBotResponseAndUpdateStage({conversation, userResponse}: GetBotResponseAndUpdateStageProps) {
  try {
    const { response, newStage, answerNextStageAutomatically, sendAnotherInfoMessage } = await getBotResponse({ userData: conversation, userResponse });

    if(newStage) {
      await whatsAppConversationRepository.updateOne({conversationId: conversation._id, stage: newStage})
    }

    return {
      response,
      sendAnotherInfoMessage,
      answerNextStageAutomatically
    }

  } catch(err) {
    console.log('get response err = ', err)
    throw err
  }
}

function getWhatsappFromSender(sender: string) {
  return sender.split('@')[0]
}
