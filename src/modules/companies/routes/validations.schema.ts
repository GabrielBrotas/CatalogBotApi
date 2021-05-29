import { Joi, Segments } from 'celebrate';

export const CREATE_COMPANY_VALIDATION = {
  [Segments.BODY]: {
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

export const UPDATE_COMPANY_VALIDATION = {
  [Segments.BODY]: Joi.object().keys({
    benefits: Joi.array().items(Joi.string().optional()).optional(),
    name: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    workTime: Joi.array().items(
      Joi.object().keys({
        day: Joi.number().required(),
        weekDay: Joi.string().required(),
        from: Joi.number().required(),
        to: Joi.number().required(),
      }),
    ),
  }),
};
