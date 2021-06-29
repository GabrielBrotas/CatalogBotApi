import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListClientOrdersUseCase } from './ListClientOrdersUseCase';

class ListClientOrdersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { companyId } = req.params
      const { page = 1, limit = 10 } = req.query
      const { _id } = req.user;

      const listClientOrdersUseCase = container.resolve(
        ListClientOrdersUseCase,
      );

      const orders = await listClientOrdersUseCase.execute({page: Number(page), limit: Number(limit), clientId: _id, companyId});

      return res.status(200).json(orders);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export { ListClientOrdersController };
