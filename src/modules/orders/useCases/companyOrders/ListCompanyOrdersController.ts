import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCompanyOrdersUseCase } from './ListCompanyOrdersUseCase';

class ListCompanyOrdersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;

      const listCompanyOrdersUseCase = container.resolve(
        ListCompanyOrdersUseCase,
      );
      const orders = await listCompanyOrdersUseCase.execute(_id);

      return res.status(200).json(orders);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export { ListCompanyOrdersController };
