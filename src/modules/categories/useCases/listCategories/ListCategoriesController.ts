import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { limit = 10, page = 1 } = req.query;
    const { companyId } = req.params;

    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const products = await listCategoriesUseCase.execute({
      _id: companyId,
      page: Number(page),
      limit: Number(limit),
    });
    return res.status(200).json(products);
  }
}

export { ListCategoriesController };
