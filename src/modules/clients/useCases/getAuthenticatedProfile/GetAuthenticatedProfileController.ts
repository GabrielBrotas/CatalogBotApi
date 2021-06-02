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

      const company = await getAuthenticatedProfileUseCase.execute(_id);

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { GetAuthenticatedProfileController };
