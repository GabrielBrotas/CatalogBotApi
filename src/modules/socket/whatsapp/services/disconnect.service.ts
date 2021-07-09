import fs from 'fs'

export async function disconnectWhatsappService(companyId: string): Promise<any> {
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
