import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

import { UpdateNotificationUseCase } from './UpdateNotificationUseCase';

class UpdateNotificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { notificationsId } = req.body;
      const { _id } = req.user;

      const updateNotificationUseCase = container.resolve(
        UpdateNotificationUseCase,
      );

      await updateNotificationUseCase.execute({userId: _id, notificationsId});

      return res.status(200).send();
    } catch (err) {
      throw new AppError(err.message)

    }
  }
}

export { UpdateNotificationController };
