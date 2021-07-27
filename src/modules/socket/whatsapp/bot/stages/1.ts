// ? menu
// export function execute() {
//   return {
//     answer: `Como eu posso te ajudar?
// 1️⃣ Ver nosso catalogo e fazer um pedido.
// 2️⃣ Para falar sobre entrega.
// 3️⃣ Para falar sobre pagamento.
// 4️⃣ Para finalizar sessão.
//     `,
//     nextStage: 2
//   }
// }

import { ICompanyFlow } from "modules/companies/schemas/Company"

export async function execute(UserResponse: string, CompanyFlow: ICompanyFlow) {

  if (!CompanyFlow) {
    return {
      answer: `Desculpe, algo deu errado`,
      nextStage: 1,
      answerNextStageAutomatically: false
    }
  }

  return {
    answer: CompanyFlow[2],
    nextStage: 2,
    answerNextStageAutomatically: false
  }
}
