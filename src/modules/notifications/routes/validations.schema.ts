import { Joi, Segments } from 'celebrate';

export const LIST_NOTIFICATIONS_VALIDATION = {
  [Segments.QUERY]: {
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
    Sender: Joi.string().optional(),
  },
};

export const CREATE_NOTIFICATION_VALIDATION = {
  [Segments.BODY]: {
    Receiver: Joi.string().required(),
    Sender: Joi.string().required(),
    Order: Joi.string().optional(),
    Text: Joi.string().required(),
    Type: Joi.string().required(),
  }
};

export const UPDATE_NOTIFICATION_VALIDATION = {
  [Segments.BODY]: {
    notificationsId: Joi.array().items(Joi.string().required()).required()
  }
};
