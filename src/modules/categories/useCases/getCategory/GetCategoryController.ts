import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetCategoryUseCase } from './GetCategoryUseCase';

const logger = new Logger('GET COMPANY');
class GetCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { cId } = req.params;
      const getCategoryUseCase = container.resolve(GetCategoryUseCase);

      const category = await getCategoryUseCase.execute(cId);

      return res.status(201).json(category);
    } catch (err) {
      logger.error(err.message)
      return res.status(400).send(err.message);
    }
  }
}

export { GetCategoryController };
