import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { limit = 10, page = 1 } = req.query;
    const { companyId } = req.params;

    try {
      const listProductsUseCase = container.resolve(ListProductsUseCase);
      const products = await listProductsUseCase.execute({
        limit: Number(limit),
        page: Number(page),
        companyId,
      });
      return res.status(200).json(products);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { ListProductsController };
