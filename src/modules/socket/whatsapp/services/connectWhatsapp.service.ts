import { WAConnection } from '@adiwajshing/baileys'
import { Response } from 'express'
import fs from 'fs'
import qr from 'qr-image'
import { Socket } from 'socket.io'
import { conn } from './connection'
import { sendMessage } from './sendMessage.service'

let storedQR: Buffer
export async function connectToWhatsApp (socket: Socket, companyId: string): Promise<any> {
  conn.companyId = companyId

  conn.on('chats-received', async ({ hasNewChats }) => {
      console.log(`you have ${conn.chats.length} chats, new chats available: ${hasNewChats}`)
      const unread = await conn.loadAllUnreadMessages()
      console.log ("you have " + unread.length + " unread messages")
  })

  conn.on('contacts-received', () => {
      console.log('you have ' + Object.keys(conn.contacts).length + ' contacts')
  })

  conn.on('qr', (QR) => {
    const qrImage = qr.imageSync(QR)
    storedQR = qrImage
    socket.emit('qr', qrImage);
  })

  conn.on('open', (openResult) => {
    console.log (`credentials updated!`)
    console.log({openResult})
    const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
    fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
    socket.emit('open', {...openResult, phoneConnected: conn.phoneConnected});
  })

  conn.on('connecting', () => {
    console.log('connecting')
  })

  conn.on('close', (closeResult) => {
    console.log({closeResult})
    socket.emit('close', closeResult)
  })

  conn.on('ws-close', (wscloseResult) => {
    console.log({wscloseResult})
    socket.emit('ws-close', wscloseResult)
  })

  conn.on('chat-update', async ({hasNewMessage, messages}) => {
    /*
      {
        "jid": "557581989817@s.whatsapp.net",
        "count": 3,
        "t": 1625399471,
        "hasNewMessage": true,
        "messages": [
          {
            "key": {
              "remoteJid": "557581989817@s.whatsapp.net",
              "fromMe": false,
              "id": "3AF8632A3869D9E4F226"
            },
            "message": {
              "conversation": "Gg"
            },
            "messageTimestamp": "1625399471"
          }
        ]
      }
    */
    if (hasNewMessage && messages) {
      const message = messages.all()[0]

      if(message.key.remoteJid && !message.key.fromMe) await sendMessage(conn, message)
    }
    // else console.log ({chatUpdate: JSON.stringify(chatUpdate, null, 2)})
  })

  try {
    await fs.promises.stat('./auth_info.json')
    conn.loadAuthInfo('./auth_info.json')
  } catch(err) {
    console.log('auth file does not exist')
  }

  try {
    console.log('try connect')
    if(conn.phoneConnected) {
      console.log('phone connected')
      socket.emit('open', {user: {...conn.user}, phoneConnected: conn.phoneConnected});
    } else {
      if(conn.state !== 'open' && conn.state !== 'connecting') {
        await conn.connect()
      } else {
        socket.emit('qr', storedQR);
      }
    }
  } catch(err) {
    console.log('err here')
    console.log({err})
  }

}
