import { IPagination } from '../../../utils/pagination';
import { INotification } from '../schemas/Notification';

export interface ICreateNotificationDTO {
  Receiver: string
  Sender: string
  Order?: string;
  Text: string
  Type: 'order'
}

export const NOTIFICATION_TYPES_ARRAY = [
  'Viewed'
] as const;
export type NOTIFICATION_TYPES = typeof NOTIFICATION_TYPES_ARRAY[number];

export interface IUpdateNotificationsDTO {
  notificationsId: string[];
  set: { [key in NOTIFICATION_TYPES]?: any };
}

export interface ListNotificationsDTO {
  Receiver: string;
  Sender?: string;
  page: number;
  limit: number;
}

export interface FindNotificationsDTO {
  Receiver: string;
}

export interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<INotification>;
  updateMany(data: IUpdateNotificationsDTO): Promise<void>;
  list(data: ListNotificationsDTO): Promise<IPagination>;
  find(data: FindNotificationsDTO): Promise<INotification[]>;
}
