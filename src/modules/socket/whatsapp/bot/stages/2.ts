import retornarIntent from '../intents/retornar';

// ? Lidar com escolha do menu
export async function execute(userResponse: string, companyId: string) {
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
        answer: 'http://localhost:3000/catalog/{{companyId}}',
        nextStage: 1,
      };

    // sobre entrega
    case 2:
      return {
        answer: 'sobre entrega...',
        nextStage: 1,
      };

    // sobre pagamento
    case 3:
      return {
        answer: 'sobre pagamento...',
        nextStage: 1,
      };

    // finalizar sessao
    case 4:
      return {
        answer: 'encerrando...',
        nextStage: 1,
      };
    default:
      return {
        answer: 'algo deu errado',
        nextStage: 1,
      };
  }
}
