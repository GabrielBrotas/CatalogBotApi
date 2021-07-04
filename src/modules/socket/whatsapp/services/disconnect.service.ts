import fs from 'fs'
import { conn } from './connection'

export async function disconnectWhatsappService(): Promise<any> {
    try {
    // verificar se o arquivo existe
    await fs.promises.stat('./auth_info.json')
  } catch {
    // se nao existir sai da funcao
    return;
  }

  await fs.promises.unlink('./auth_info.json')
  conn.close()
  conn.logout()

  console.log('disconnected wpp')
}
