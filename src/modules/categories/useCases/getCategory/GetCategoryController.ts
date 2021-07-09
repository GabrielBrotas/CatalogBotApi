import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetCategoryUseCase } from './GetCategoryUseCase';

const logger = new Logger('GET COMPANY');
class GetCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.params;
      const getCategoryUseCase = container.resolve(GetCategoryUseCase);

      const category = await getCategoryUseCase.execute(categoryId);

      return res.status(201).json(category);
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { GetCategoryController };
