import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetMyCompanyUseCase } from './GetMyCompanyUseCase';

const logger = new Logger('GET MY COMPANY');
class GetMyCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const getMyCompanyUseCase = container.resolve(GetMyCompanyUseCase);

      const company = await getMyCompanyUseCase.execute(_id);

      return res.status(201).json(company);
    } catch (err) {
      logger.error(err.message);
      throw new AppError(err.message, 400)

    }
  }
}

export { GetMyCompanyController };
