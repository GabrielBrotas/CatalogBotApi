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
          product: Joi.object()
            .keys({
              _id: Joi.string().required(),
              name: Joi.string().required(),
              price: Joi.number().required(),
              description: Joi.string().optional(),
              companyId: Joi.string().required(),
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
            })
            .required(),
          amount: Joi.number().required(),
          options: Joi.object()
            .keys({
              productOptionName: Joi.string().required(),
              optionAdditional: Joi.object()
                .keys({
                  name: Joi.string().required(),
                  price: Joi.number().required(),
                })
                .required(),
              quantity: Joi.number().required(),
            })
            .optional(),
        }),
      )
      .required(),
  },
};
