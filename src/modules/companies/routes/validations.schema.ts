import { Joi, Segments } from 'celebrate';

export const CREATE_COMPANY_VALIDATION = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
};

export const AUTHENTICATE_COMPANY_VALIDATION = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const GET_COMPANY_VALIDATION = {
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
};

export const REFRESH_COMPANY_VALIDATION = {
  [Segments.BODY]: {
    refresh_token: Joi.string().required(),
  },
};

export const ADD_COMPANY_DATA_VALIDATION = {
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
  [Segments.BODY]: {
    type: Joi.string().required(),
    clientId: Joi.string().optional(),
    orderId: Joi.string().optional(),
  },
};

export const UPDATE_COMPANY_VALIDATION = {
  [Segments.BODY]: Joi.object().keys({
    benefits: Joi.array().items(Joi.string().optional()).optional(),
    name: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    acceptedPaymentMethods: Joi.object().keys({
      boleto: Joi.boolean().optional(),
      creditCard: Joi.boolean().optional(),
      pix: Joi.boolean().optional(),
      money: Joi.boolean().optional(),
      debit: Joi.boolean().optional(),
    }),
    workTime: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string().optional(),
        day: Joi.number().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
      }),
    ),
  }),
};
