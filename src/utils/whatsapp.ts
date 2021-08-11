export function formatUserCellphoneToBaileysRemoteJID(cellphone: string): {
  with9: string
  without9: string
} {
  if(!cellphone) return null
  return {
    with9: `55${cellphone}@s.whatsapp.net`,
    without9: `55${cellphone.slice(0,2) + cellphone.slice(3)}@s.whatsapp.net`
  }
}
