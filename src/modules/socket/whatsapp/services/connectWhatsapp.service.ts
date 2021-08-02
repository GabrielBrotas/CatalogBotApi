import { MessageType, ProxyAgent, WAConnection } from '@adiwajshing/baileys'
import fs from 'fs'
import qr from 'qr-image'
import { Socket } from 'socket.io'
import { sendMessage } from './sendMessage.service'

const storedQRS: Array<{companyId: string, data: Buffer}> = []

export async function connectToWhatsApp (socket: Socket, conn: WAConnection, companyId: string): Promise<any> {
  // const conn = new WAConnection()

  conn.on('qr', (QR) => {
    console.log('send qr')
    const qrImage = qr.imageSync(QR)
    storedQRS.push({ companyId, data: qrImage })
    conn.removeAllListeners("qr");
    socket.emit('qr', qrImage);
  })

  conn.on('open', async (openResult) => {
    // console.log({openResult})

    // remove old auth file
    try {
      const authFileExists = await checkIfFileConnectionExists(companyId)
      if(authFileExists) await removeFileConnection(companyId)
    } catch (err) { console.log(err)}

    // new auth file
    const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
    fs.writeFileSync(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`, JSON.stringify(authInfo, null, '\t')) // save this info to a file
    socket.emit('open', {...openResult, phoneConnected: conn.phoneConnected});
  })

  conn.on('connecting', async () => {
    try {
      const authFileExists = await checkIfFileConnectionExists(companyId)
      if(authFileExists) await removeFileConnection(companyId)
    } catch (err) { console.log(err)}
    console.log('connecting')
  })

  conn.on('close', (closeResult) => {
    socket.emit('close', closeResult)
  })

  conn.on('ws-close', (wscloseResult) => {
    socket.emit('ws-close', wscloseResult)
  })

  conn.on('chat-update',(chatUpdate) => {
    if (chatUpdate.hasNewMessage && chatUpdate.messages) {
        const message = chatUpdate.messages.all()[0]
        if(message.key.remoteJid) sendMessage({conn, messageData: message, companyId})
      }
    }
  )

  try {
    await fs.promises.stat(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
    conn.loadAuthInfo(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
  } catch(err) {
    console.log('auth file does not exist')
    conn.close()
    await conn.logout()
  }

  try {
    if(conn.phoneConnected) {
      console.log('phone connected')
      socket.emit('open', {user: {...conn.user}, phoneConnected: conn.phoneConnected});
    } else {
      if(conn.state !== 'open' && conn.state !== 'connecting') {
        console.log('call connect')
        await conn.connect()
        console.log('connected')
      } else {
        console.log('emit stored qr')
        const storedQR = storedQRS.find(qr => qr.companyId === companyId)
        socket.emit('qr', storedQR?.data);
      }
    }
  } catch(err) {
    console.log('err here')
    console.log({err})
  }

}

async function removeFileConnection(companyId: string) {
  try {
    // verificar se o arquivo existe
    await fs.promises.stat(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
  } catch {
    // se nao existir sai da funcao
    return;
  }

  await fs.promises.unlink(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
  return
}

async function checkIfFileConnectionExists(companyId: string): Promise<boolean> {
  try {
    // verificar se o arquivo existe
    await fs.promises.stat(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)

    return true
  } catch {
    // se nao existir sai da funcao
    return false;
  }
}
