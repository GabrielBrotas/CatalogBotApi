import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { INotificationsRepository } from '../../repositories/INotificationsRepository';
import { INotification } from '../../schemas/Notification';

interface IRequest {
  Sender: string
  Receiver: string
  Order?: string;
  Text: string
  Type: 'order'
}

@injectable()
class CreateNotificationUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    Sender,
    Receiver,
    Order,
    Text,
    Type
  }: IRequest): Promise<INotification> {
    try {
      const notification = await this.notificationsRepository.create({
        Sender,
        Receiver,
        Order,
        Text,
        Type
      });

      return notification
    } catch (err) {
      throw new AppError(err, 500)
    }
  }
}

export { CreateNotificationUseCase };
