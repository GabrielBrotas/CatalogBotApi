import { Joi, Segments } from 'celebrate';

const PRODUCT_VALIDATION = {
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required(),
  description: Joi.any(),
  options: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        isRequired: Joi.boolean().required(),
        maxQuantity: Joi.number().required(),
        minQuantity: Joi.number().required(),
        additionals: Joi.array()
          .items(
            Joi.object()
              .keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
              })
              .required(),
          )
          .required(),
      }),
    )
    .optional(),
};

export const GET_PRODUCT_VALIDATION = {
  [Segments.PARAMS]: {
    pId: Joi.string().required(),
  },
};

export const LIST_PRODUCT_VALIDATION = {
  [Segments.PARAMS]: {
    companyId: Joi.string().required(),
  },
  [Segments.QUERY]: {
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  },
};

export const CREATE_PRODUCT_VALIDATION = {
  [Segments.BODY]: PRODUCT_VALIDATION,
};

export const DELETE_PRODUCT_VALIDATION = {
  [Segments.PARAMS]: {
    pId: Joi.string().required(),
  },
};

export const UPDATE_PRODUCT_VALIDATION = {
  [Segments.PARAMS]: {
    pId: Joi.string().required(),
  },
  [Segments.BODY]: PRODUCT_VALIDATION,
};
