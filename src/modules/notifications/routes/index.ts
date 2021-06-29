import { CREATE_NOTIFICATION_VALIDATION, LIST_NOTIFICATIONS_VALIDATION, UPDATE_NOTIFICATION_VALIDATION } from './validations.schema';
import { Router } from 'express';
import { celebrate } from 'celebrate';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

import { CreateNotificationController } from '../useCases/createNotification/CreateNotificationController';
import { ListNotificationsController } from '../useCases/listNotifications/ListNotificationsController';
import { UpdateNotificationController } from '../useCases/updateNotification/UpdateNotificationController';

const createNotificationController = new CreateNotificationController()
const listNotificationsController = new ListNotificationsController()
const updateNotificationController = new UpdateNotificationController()

const notificationsRouter = Router();

notificationsRouter.get(
  '/',
  ensureAuthenticated,
  celebrate(LIST_NOTIFICATIONS_VALIDATION),
  listNotificationsController.handle,
);

notificationsRouter.post(
  '/',
  celebrate(CREATE_NOTIFICATION_VALIDATION),
  createNotificationController.handle,
);

notificationsRouter.put(
  '/',
  ensureAuthenticated,
  celebrate(UPDATE_NOTIFICATION_VALIDATION),
  updateNotificationController.handle,
);

export { notificationsRouter };
