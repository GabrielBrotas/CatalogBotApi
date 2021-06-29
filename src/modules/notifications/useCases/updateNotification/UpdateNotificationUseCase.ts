import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { INotificationsRepository } from '../../repositories/INotificationsRepository';

interface IRequest {
  notificationsId: Array<string>
  userId: string
}

@injectable()
class UpdateNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({ notificationsId, userId }: IRequest): Promise<void> {
    const notifications = await this.notificationsRepository.find({Receiver: userId});
    const userNotificationsToUpdate = notifications.filter(notification => notificationsId.includes(String(notification._id)))

    if (userNotificationsToUpdate.every(notification => String(notification.Receiver) !== String(userId))) throw new AppError('Not authorized', 404);

    this.notificationsRepository.updateMany({notificationsId, set: {Viewed: true}})

    if(notifications.length >= 15) {
      const allNotificationsId = notifications.map(notification => notification._id)
      this.notificationsRepository.deleteMany({ notificationsId: allNotificationsId })
    }

    return;
  }
}

export { UpdateNotificationUseCase };
