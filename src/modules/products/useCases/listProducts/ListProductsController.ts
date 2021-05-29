import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listProductsUseCase = container.resolve(ListProductsUseCase)
    const products = await listProductsUseCase.execute();
    return res.status(200).json(products);
  }
}

export { ListProductsController };
