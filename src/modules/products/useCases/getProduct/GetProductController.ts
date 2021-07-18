import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';

import { GetProductUseCase } from './GetProductUseCase';

const logger = new Logger('GET PRODUCT');
class GetProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { pId } = req.params;
      const getProductUseCase = container.resolve(GetProductUseCase);

      const product = await getProductUseCase.execute(pId);

      return res.status(201).json(product);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message)
    }
  }
}

export { GetProductController };
