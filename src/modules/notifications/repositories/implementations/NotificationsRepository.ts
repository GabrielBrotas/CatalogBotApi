import { INotification, Notification } from '../../schemas/Notification'
import { FindNotificationsDTO, ICreateNotificationDTO, INotificationsRepository, IUpdateNotificationsDTO, ListNotificationsDTO } from './../INotificationsRepository';
import { IPagination, paginateModel } from '../../../../utils/pagination';

export class NotificationsRepository implements INotificationsRepository {
  private repository;

  constructor() {
    this.repository = Notification;
  }

  async create({Text, Type, Receiver, Sender, Order}: ICreateNotificationDTO): Promise<INotification> {
    const notification = await this.repository.create({Text, Type, Receiver, Sender, Order, Viewed: false})

    return notification
  }

  async updateMany({notificationsId, set}: IUpdateNotificationsDTO): Promise<void> {
    notificationsId.map(async (notification) => {
      await this.repository.updateOne({_id: notification}, {$set: {...set}})
    })
    return
  }

  async list({page, limit = 10, Receiver, Sender}: ListNotificationsDTO): Promise<IPagination> {
    const startIndex = (page - 1) * limit;

    const results = await paginateModel({page, limit, repository: this.repository, countField: [{ Receiver, ...( Sender && {Sender}) }]})

    results.results = await this.repository
    .find({ Receiver, ...( Sender && {Sender}) })
    .skip(startIndex)
    .limit(limit)
    .sort({ Viewed: 1, created_at: -1 })
    .exec();

    return results;
  }

  async find({Receiver}:FindNotificationsDTO): Promise<INotification[]> {
    const notifications = await this.repository.find({Receiver})
    return notifications;
  }
}
