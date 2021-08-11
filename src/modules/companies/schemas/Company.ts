import mongoose, { Schema } from 'mongoose';

export type WorkTime = {
  day: number;
  from: string;
  to: string;
};

export type CompanyPaymentMethods = {
  boleto: boolean;
  creditCard: boolean;
  pix: boolean;
  money: boolean;
  debit: boolean;
};

export type ICompanyFlow = {
  '1': string,
  '2': string,
  '2-1-1': string,
  '2-1-2': string,
  '2-2-1': string,
  '2-2-2': string,
  '2-3-1': string,
  '2-3-2': string,
  '2-4': string,
  '3-1': string,
  '3-2': string,
  '3-3': string,
  '3-4': string,
}
export interface ICompany {
  _id: string;
  email: string;
  password?: string;
  name: string;
  mainImageUrl?: string;
  workTime?: WorkTime[];
  shortDescription?: string;
  benefits: string[];
  acceptedPaymentMethods: CompanyPaymentMethods;
  roles: string[];
  flow: ICompanyFlow
  created_at: Date;
}

const CompanySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  mainImageUrl: String,
  workTime: [
    {
      day: {
        type: Number,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
  ],
  shortDescription: String,
  benefits: [String],
  acceptedPaymentMethods: {
    boleto: Boolean,
    creditCard: Boolean,
    pix: Boolean,
    money: Boolean,
    debit: Boolean,
  },
  roles: [String],
  flow: {
    '1': {
      type: String,
      required: true,
      default: `Olá, seja bem vindo a {{name}} eu sou um bot`
    },
    '2': {
      type: String,
      required: true,
      default: `Como eu posso te ajudar?
      1️⃣ Ver nosso catalogo e fazer um pedido.
      2️⃣ Para falar sobre entrega.
      3️⃣ Para falar sobre pagamento.
      4️⃣ Para finalizar sessão.
      `
    },
    '2-1-1': {
      type: String,
      required: true,
      default: `{{Link do Catalogo}}`
    },
    '2-1-2': {
      type: String,
      required: true,
      default: `No nosso catalogo você vai poder ver todos os meus produtos e realizar um pedido. Agora qualquer coisa basta me chamar :).`
    },
    '2-2-1': {
      type: String,
      required: true,
      default: `sobre entrega...t`
    },
    '2-2-2': {
      type: String,
      required: true,
      default: `Qualquer coisa basta me chamar :).`
    },
    '2-3-1': {
      type: String,
      required: true,
      default: `sobre pagamento...`
    },
    '2-3-2': {
      type: String,
      required: true,
      default: `Qualquer coisa basta me chamar :).`
    },
    '2-4': {
      type: String,
      required: true,
      default: `encerrando...`
    },
    '3-1': {
      type: String,
      required: true,
      default: `Acabamos de confirmar seu pedido e logo mais te informaremos quando enviarmos ao destino`
    },
    '3-2': {
      type: String,
      required: true,
      default: `Seu pedido está a caminho`
    },
    '3-3': {
      type: String,
      required: true,
      default: `Aproveito nosso produto, qualquer coisa que precisar basta olhar no nosso catálogo ou nos chamar aqui`
    },
    '3-4': {
      type: String,
      required: true,
      default: `Seu pedido foi cancelado`
    },
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
