import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

import { Logger } from '../../../../shared/middlewares/logger';

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
      return res.status(400).send(err.message);
    }
  }
}

export { UpdateCompanyController };
