import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';

import { CreateNotificationUseCase } from './CreateNotificationUseCase';

const logger = new Logger('CREATE NOTIFICATION');
class CreateNotificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { Order, Text, Type, Receiver, Sender, Status } = req.body;
    try {
      const createNotificationUseCase = container.resolve(CreateNotificationUseCase);

      const notification = await createNotificationUseCase.execute({
        Text,
        Type,
        Sender,
        Order,
        Receiver,
        Status
      });

      return res.status(201).json(notification);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message)
    }
  }
}

export { CreateNotificationController };
