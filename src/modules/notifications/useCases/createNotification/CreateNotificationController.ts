import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { CreateNotificationUseCase } from './CreateNotificationUseCase';

const logger = new Logger('CREATE NOTIFICATION');
class CreateNotificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { Order, Text, Type, Receiver, Sender } = req.body;
    try {
      const createNotificationUseCase = container.resolve(CreateNotificationUseCase);

      const notification = await createNotificationUseCase.execute({
        Text,
        Type,
        Sender,
        Order,
        Receiver,
      });

      return res.status(201).json(notification);
    } catch (err) {
      logger.error(err.message)
      return res.status(400).send(err.message);
    }
  }
}

export { CreateNotificationController };
