import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetCompanyUseCase } from './GetCompanyUseCase';

const logger = new Logger('GET COMPANY');
class GetCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getCompanyUseCase = container.resolve(GetCompanyUseCase);

      const company = await getCompanyUseCase.execute(id);

      return res.status(201).json(company);
    } catch (err) {
      logger.error(err.message)
      return res.status(400).send(err.message);
    }
  }
}

export { GetCompanyController };
