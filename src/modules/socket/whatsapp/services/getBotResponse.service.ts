import { removeSpeciaCaracteresAndLetters } from "../../../../utils/removeSpecialCaracteresAndLetters";
import { stages } from "../bot";
import { IWhatsAppConversation } from "../schemas/WhatsAppConversation";

interface IGetBotResponseDTO {
  userData: IWhatsAppConversation;
  userResponse: string | number;
  nextStageAnswer?: boolean;
}

interface GetKeyFromIntentProps {
  intent: {
    [key: string]: string[];
  }[];
  valueToMatch: string;
}

function getKeyFromIntent({
  intent,
  valueToMatch,
}: GetKeyFromIntentProps): null | string | number {
  let response = null;
  Object.keys(intent).map((key, index) => {
    const matchedIntent = Array(intent[index + 1]).filter(value =>
      removeSpeciaCaracteresAndLetters(String(value)).match(valueToMatch),
    );
    if (matchedIntent.length > 0) response = key;
  });

  return response;
}

export async function getBotResponse({
  userData,
  userResponse,
  nextStageAnswer = false,
}: IGetBotResponseDTO): Promise<{
  response: string;
  newStage?: number
  answerNextStageAutomatically: boolean;
}> {
  const { company, stage, whatsapp } = userData;

  let userResponseFormated = removeSpeciaCaracteresAndLetters(
    String(userResponse),
  );

  const currentStage = stages[Number(stage)];

  // verificar a intent
  if (currentStage.intent) {
    // pegar a opção escolhida 1, 2, 3...
    const response = getKeyFromIntent({
      intent: currentStage.intent,
      valueToMatch: userResponseFormated,
    });

    // se a opção escolhida for inválida
    if (!response)
      return {
        response: 'Esta opção é inválida, tente novamente',
        answerNextStageAutomatically: false
      };

    // transformar a resposta do usuario na key da intente (1, 2, 3...)
    userResponseFormated = String(response);
  }

  let {
    answer,
    nextStage,
    answerNextStageAutomatically = false,
  } = await currentStage.fulfilment.execute(userResponseFormated);

  let response = answer;

  if (answer.includes('{{name}}')) {
    response = response.replace('{{name}}', company.name);
  }
  console.log({answer})
  if (answer.includes('http://localhost:3000/catalog/{{companyId}}')) {
    response = response.replace('http://localhost:3000/catalog/{{companyId}}', `http://localhost:3000/catalog/${company._id}`);
  }

  return { response, newStage: nextStage, answerNextStageAutomatically }
}
