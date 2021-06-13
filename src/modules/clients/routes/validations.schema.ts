import { Joi, Segments } from 'celebrate';

export const CREATE_CLIENT_VALIDATION = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().optional(),
    defaultAddress: Joi.object()
      .keys({
        state: Joi.string().allow(null, '').optional(),
        city: Joi.string().allow(null, '').optional(),
        street: Joi.string().allow(null, '').optional(),
        neighborhood: Joi.string().allow(null, '').optional(),
        number: Joi.string().allow(null, '').optional(),
        cep: Joi.string().allow(null, '').optional(),
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
