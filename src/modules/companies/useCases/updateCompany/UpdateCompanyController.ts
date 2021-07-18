import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

import { Logger } from '../../../../shared/middlewares/logger';
import { AppError } from '../../../../shared/errors/AppError';

const logger = new Logger('UPDATE COMPANY');
class UpdateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const { benefits, name, shortDescription, workTime, acceptedPaymentMethods } = req.body;
      const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

      const company = await updateCompanyUseCase.execute({
        _id,
        benefits,
        name,
        shortDescription,
        acceptedPaymentMethods,
        workTime,
      });

      return res.status(201).json(company);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message, 400)

    }
  }
}

export { UpdateCompanyController };
