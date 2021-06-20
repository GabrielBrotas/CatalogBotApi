import { Joi, Segments } from 'celebrate';

export const CREATE_CATEGORY_VALIDATION = {
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
};

export const DELETE_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    categoryId: Joi.string().required(),
  },
};

export const GET_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    categoryId: Joi.string().required(),
  },
};

export const LIST_CATEGORIES_VALIDATION = {
  [Segments.PARAMS]: {
    companyId: Joi.string().required(),
  },
  [Segments.QUERY]: {
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  },
};

export const UPDATE_CATEGORY_VALIDATION = {
  [Segments.PARAMS]: {
    categoryId: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
};
