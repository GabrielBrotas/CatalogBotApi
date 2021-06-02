import { Joi, Segments } from 'celebrate';

export const CREATE_CATEGORY_VALIDATION = {
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
};

export const DELETE_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    cId: Joi.string().required(),
  },
};

export const GET_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    cId: Joi.string().required(),
  },
};

export const UPDATE_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    cId: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
};
