import { AppError } from './../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetAuthenticatedProfileUseCase } from './GetAuthenticatedProfileUseCase';

const logger = new Logger('GET CLIENT');
class GetAuthenticatedProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const getAuthenticatedProfileUseCase = container.resolve(
        GetAuthenticatedProfileUseCase,
      );

      const client = await getAuthenticatedProfileUseCase.execute(_id);

      return res.status(201).json(client);
    } catch (err) {
      throw new AppError(err.message);

    }
  }
}

export { GetAuthenticatedProfileController };
