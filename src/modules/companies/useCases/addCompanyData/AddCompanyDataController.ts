import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { AddCompanyDataUseCase } from './AddCompanyDataUseCase';

const logger = new Logger('ADD COMPANY VIEW');

class AddCompanyDataController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id: companyId } = req.params;
      const { clientId, type, orderId } = req.body;

      const addCompanyDataUseCase = container.resolve(AddCompanyDataUseCase);

      await addCompanyDataUseCase.execute({ companyId, clientId, orderId, type });

      return res.status(201).send();
    } catch (err) {
      logger.error(err.message)
      return res.status(400).send(err.message);
    }
  }
}

export { AddCompanyDataController };
