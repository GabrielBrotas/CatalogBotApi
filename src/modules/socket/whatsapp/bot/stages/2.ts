import { APP_API_URL } from './../../../../../config/constants';
import { ICompanyFlow } from "modules/companies/schemas/Company"
import retornarIntent from '../intents/retornar';

// ? Lidar com escolha do menu
export async function execute(userResponse: string, CompanyFlow: string) {
  if (!CompanyFlow) {
    return {
      answer: `Desculpe, algo deu errado`,
      nextStage: 0,
      answerNextStageAutomatically: false
    }
  }

  if (
    Number(userResponse) === 0 ||
    retornarIntent.indexOf(userResponse) != -1
  ) {
    const { answer, nextStage } = await require('./0').execute();
    return { answer, nextStage: nextStage - 1 };
  }

  switch (Number(userResponse)) {
    // catalogo
    case 1:
      return {
        answer: `${APP_API_URL}/catalog/{{companyId}}`,
        nextStage: 1,
        // sendAnotherInfoMessage: 'No nosso catalogo você vai poder ver todos os meus produtos e realizar um pedido. \nAgora qualquer coisa basta me chamar :).',
        sendAnotherInfoMessage: CompanyFlow['2-1-2']
      };

    // sobre entrega
    case 2:
      return {
        // answer: 'sobre entrega...',
        answer: CompanyFlow['2-2-1'],
        nextStage: 1,
        // sendAnotherInfoMessage: 'Qualquer coisa basta me chamar :).',
        sendAnotherInfoMessage: CompanyFlow['2-2-2']
      };

    // sobre pagamento
    case 3:
      return {
        // answer: 'sobre pagamento...',
        answer: CompanyFlow['2-3-1'],
        nextStage: 1,
        // sendAnotherInfoMessage: 'Qualquer coisa basta me chamar :).',
        sendAnotherInfoMessage: CompanyFlow['2-3-2']
      };

    // finalizar sessao
    case 4:
      return {
        // answer: 'encerrando...',
        answer: CompanyFlow['2-4'],
        nextStage: 1,
      };
    default:
      return {
        answer: 'Desculpe, algo deu errado',
        nextStage: 1,
      };
  }
}
