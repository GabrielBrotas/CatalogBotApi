import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListMyCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = req.user;
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const products = await listCategoriesUseCase.execute(_id);
    return res.status(200).json(products);
  }
}

export { ListMyCategoriesController };
