import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';
import { ListNotificationsUseCase } from './ListNotificationsUseCase';

const logger = new Logger('LIST NOTIFICATION');

class ListNotificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit, Sender } = req.query;
    const { _id } = req.user;

    try {
      const listNotificationsUseCase = container.resolve(
        ListNotificationsUseCase,
      );

      const results = await listNotificationsUseCase.execute({
        Receiver: _id,
        limit: Number(limit),
        page: Number(page),
        ...(Sender && {Sender: String(Sender)} )
      });

      return res.status(201).json(results);
    } catch (err) {
      logger.error(err.message)
      return res.status(400).json(err);
    }
  }
}

export { ListNotificationsController };
