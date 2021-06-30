import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { ListMyCompanyDataAnalysisUseCase } from './ListMyCompanyDataAnalysisUseCase';

const logger = new Logger('GET DATA ANALYSIS');
class ListMyCompanyDataAnalysisController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const listMyCompanyDataAnalysisUseCase = container.resolve(ListMyCompanyDataAnalysisUseCase);

      const datas = await listMyCompanyDataAnalysisUseCase.execute(_id);

      return res.status(201).json(datas);
    } catch (err) {
      logger.error(err.message);
      return res.status(400).send(err.message);
    }
  }
}

export { ListMyCompanyDataAnalysisController };
