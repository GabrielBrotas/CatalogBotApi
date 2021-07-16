import { IPagination } from '../../../utils/pagination';
import { INotification } from '../schemas/Notification';

export interface ICreateNotificationDTO {
  Receiver: string;
  Sender: string;
  Order?: string;
  Text: string;
  Type: 'order';
  Status: string
}

export const NOTIFICATION_TYPES_ARRAY = [
  'Viewed'
] as const;
export type NOTIFICATION_TYPES = typeof NOTIFICATION_TYPES_ARRAY[number];

export interface IUpdateNotificationsDTO {
  notificationsId: string[];
  set: { [key in NOTIFICATION_TYPES]?: any };
}

export interface IDeleteNotificationsDTO {
  notificationsId: string[];
}

export interface ListNotificationsDTO {
  Receiver: string;
  Sender?: string;
  page: number;
  limit: number;
}

export interface FindNotificationsDTO {
  Receiver: string;
  NotificationsID?:string[]
}

export interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<INotification>;
  updateMany(data: IUpdateNotificationsDTO): Promise<void>;
  deleteMany(data: IDeleteNotificationsDTO): Promise<void>;
  list(data: ListNotificationsDTO): Promise<IPagination<INotification>>;
  find(data: FindNotificationsDTO): Promise<INotification[]>;
}
