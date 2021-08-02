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
    answer: CompanyFlow[1],
    nextStage: 1,
    answerNextStageAutomatically: true
  }
}

