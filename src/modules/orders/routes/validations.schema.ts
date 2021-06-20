import { Joi, Segments } from 'celebrate';

const orderProductSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  product: Joi.object().keys({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().allow(null, '').optional(),
  }),
  amount: Joi.number().required(),
  comment: Joi.string().allow(null, '').optional(),
  pickedOptions: Joi.array().items(
    Joi.object()
      .keys({
        _id: Joi.string().optional(),
        productOptionName: Joi.string().required(),
        optionAdditionals: Joi.array().items(
          Joi.object()
            .keys({
              _id: Joi.string().optional(),
              name: Joi.string().required(),
              price: Joi.number().required(),
              amount: Joi.number().required(),
            })
            .required(),
        ),
      })
      .optional(),
  ),
});

export const CREATE_ORDER_VALIDATION = {
  [Segments.BODY]: {
    paymentMethod: Joi.string().required(),
    deliveryAddress: Joi.object().keys({
      state: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      cep: Joi.string().required(),
    }),
    totalPrice: Joi.number().required(),
    orderProducts: Joi.array().items(orderProductSchema),
  },
};

export const GET_ORDER_VALIDATION = {
  [Segments.PARAMS]: {
    orderId: Joi.string().required(),
  },
};

export const GET_ORDERS_VALIDATION = {
  [Segments.QUERY]: {
    page: Joi.string().required(),
    limit: Joi.string().required(),
  },
};

const cartProductSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  product: Joi.string().required(),
  amount: Joi.number().required(),
  comment: Joi.string().allow(null, '').optional(),
  pickedOptions: Joi.array().items(
    Joi.object()
      .keys({
        _id: Joi.string().optional(),
        productOptionName: Joi.string().required(),
        optionAdditionals: Joi.array().items(
          Joi.object()
            .keys({
              _id: Joi.string().optional(),
              name: Joi.string().required(),
              price: Joi.number().required(),
              amount: Joi.number().required(),
            })
            .required(),
        ),
      })
      .optional(),
  ),
});

export const ADD_PRODUCT_TO_CART_VALIDATION = {
  [Segments.PARAMS]: {
    companyId: Joi.string().required(),
  },
  [Segments.BODY]: {
    orderProduct: cartProductSchema,
  },
};

export const GET_CART_VALIDATION = {
  [Segments.PARAMS]: {
    companyId: Joi.string().required(),
  },
};

export const UPDATE_CART_VALIDATION = {
  [Segments.PARAMS]: {
    cartId: Joi.string().required(),
  },
  [Segments.BODY]: {
    orderProducts: Joi.array().items(cartProductSchema),
  },
};

export const DELETE_CART_VALIDATION = {
  [Segments.PARAMS]: {
    cartId: Joi.string().required(),
  },
};

export const DELETE_PRODUCT_FROM_CART_VALIDATION = {
  [Segments.PARAMS]: {
    cartId: Joi.string().required(),
    orderProductId: Joi.string().required(),
  },
};
