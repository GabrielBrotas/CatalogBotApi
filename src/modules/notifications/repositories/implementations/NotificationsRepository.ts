import { INotification, Notification } from '../../schemas/Notification'
import { FindNotificationsDTO, ICreateNotificationDTO, INotificationsRepository, IUpdateNotificationsDTO, ListNotificationsDTO, IDeleteNotificationsDTO } from './../INotificationsRepository';
import { IPagination, paginateModel } from '../../../../utils/pagination';

export class NotificationsRepository implements INotificationsRepository {
  private repository;

  constructor() {
    this.repository = Notification;
  }

  async create({Text, Type, Receiver, Sender, Order, Status}: ICreateNotificationDTO): Promise<INotification> {
    const notification = await this.repository.create({Text, Type, Receiver, Sender, Order, Viewed: false, Status})

    return notification
  }

  async updateMany({notificationsId, set}: IUpdateNotificationsDTO): Promise<void> {
    notificationsId.map(async (notification) => {
      await this.repository.updateOne({_id: notification}, {$set: {...set}})
    })
    return
  }

  async deleteMany({notificationsId}: IDeleteNotificationsDTO): Promise<void> {
    notificationsId.map(async (notification) => {
      await this.repository.deleteOne({_id: notification})
    })
    return
  }

  async list({page, limit = 10, Receiver, Sender}: ListNotificationsDTO): Promise<IPagination<INotification>> {
    const startIndex = (page - 1) * limit;

    const countField: any = { Receiver }

    if (Sender) countField['Sender'] = Sender

    const results = await paginateModel<INotification>({page, limit, repository: this.repository, countField})

    results.results = await this.repository
    .find({ Receiver, ...( Sender && {Sender}) })
    .skip(startIndex)
    .limit(limit)
    .sort({ Viewed: 1, created_at: -1 })
    .exec();

    return results;
  }

  async find({Receiver, NotificationsID}:FindNotificationsDTO): Promise<INotification[]> {
    const notifications = await this.repository.find({Receiver, ...(NotificationsID && { _id: { $in: NotificationsID } })})
    return notifications;
  }
}
