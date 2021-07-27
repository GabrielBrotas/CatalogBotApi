import { ICompanyFlow } from './../../../companies/schemas/Company';

type IStageDTO = {
  description: string;
  fulfilment: {
    execute(
      UserResponse: string,
      CompanyFlow: ICompanyFlow
    ): Promise<{
      answer: string;
      nextStage: number;
      answerNextStageAutomatically?: boolean
      sendAnotherInfoMessage?: string
    }>;
  };
  intent: {
    [key: string]: string[];
  }[];
}[];


export const stages: IStageDTO = [
  {
    description: 'Boas Vindas',
    fulfilment: require('./stages/0'),
    intent: null,
  },
  {
    description: 'Pegar Menu',
    fulfilment: require('./stages/1'),
    intent: null,
  },
  {
    description: 'Lidar com escolha do menu',
    fulfilment: require('./stages/2'),
    intent: require('./intents/menu').default,
  },
];
