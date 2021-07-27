import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyFlowUseCase } from './UpdateCompanyFlowUseCase';

import { Logger } from '../../../../shared/middlewares/logger';
import { AppError } from '../../../../shared/errors/AppError';

const logger = new Logger('UPDATE COMPANY FLOW');
class UpdateCompanyFlowController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const { flow } = req.body;

      const updateCompanyFlowUseCase = container.resolve(UpdateCompanyFlowUseCase);

      const flowUpdated = await  updateCompanyFlowUseCase.execute({
        CompanyID: _id,
        flow
      });

      return res.status(201).json(flowUpdated);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message, 400)

    }
  }
}

export { UpdateCompanyFlowController };
