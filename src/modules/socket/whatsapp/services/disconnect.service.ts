import { WAConnection } from '@adiwajshing/baileys';
import fs from 'fs'

export async function disconnectWhatsappService(companyId: string, conn: WAConnection): Promise<any> {
  try {

    conn.close()
    await conn.logout()
    // verificar se o arquivo existe
    await fs.promises.stat(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
  } catch {
    // se nao existir sai da funcao
    return;
  }

  await fs.promises.unlink(`./src/modules/socket/whatsapp/bot/auth/auth_info-${companyId}.json`)
  return

}
