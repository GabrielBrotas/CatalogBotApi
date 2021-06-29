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

    if (notifications.every(notification => String(notification.Receiver) !== String(userId))) throw new AppError('Not authorized', 404);

    await this.notificationsRepository.updateMany({notificationsId, set: {Viewed: true}})
    return;
  }
}

export { UpdateNotificationUseCase };
