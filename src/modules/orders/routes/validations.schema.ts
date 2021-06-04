import { Joi, Segments } from 'celebrate';

export const CREATE_ORDER_VALIDATION = {
  [Segments.BODY]: {
    comment: Joi.string().optional(),
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
    orderProducts: Joi.array()
      .items(
        Joi.object().keys({
          productId: Joi.string().required(),
          companyId: Joi.string().required(),
          amount: Joi.number().required(),
          pickedOptions: Joi.array().items(
            Joi.object()
              .keys({
                productOptionName: Joi.string().required(),
                optionAdditionals: Joi.array().items(
                  Joi.object()
                    .keys({
                      name: Joi.string().required(),
                      price: Joi.number().required(),
                      amount: Joi.number().required(),
                    })
                    .required(),
                ),
              })
              .optional(),
          ),
        }),
      )
      .required(),
  },
};
