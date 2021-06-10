import { Joi, Segments } from 'celebrate';

export const CREATE_CLIENT_VALIDATION = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().optional(),
    defaultAddress: Joi.object()
      .keys({
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        number: Joi.string().required(),
        cep: Joi.string().required(),
      })
      .optional(),
  },
};

export const AUTHENTICATE_CLIENT_VALIDATION = {
  [Segments.BODY]: Joi.object().keys({
    user: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
