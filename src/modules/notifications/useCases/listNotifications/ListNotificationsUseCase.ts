import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IPagination } from '../../../../utils/pagination';
import { INotificationsRepository } from '../../repositories/INotificationsRepository';

interface IRequest {
  Receiver: string;
  Sender?: string
  page?: number;
  limit?: number;
}

@injectable()
class ListNotificationsUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({ Receiver, Sender, page = 1, limit = 10 }: IRequest): Promise<IPagination> {
    try {
      const result = await this.notificationsRepository.list({ Receiver, Sender, page, limit})

      return result;
    } catch(err) {
      throw new AppError(err, 500)
    }
  }
}

export { ListNotificationsUseCase };
