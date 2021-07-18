import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ListCompanyOrdersUseCase } from './ListCompanyOrdersUseCase';

class ListCompanyOrdersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10 } = req.query
      const { _id } = req.user;

      const listCompanyOrdersUseCase = container.resolve(
        ListCompanyOrdersUseCase,
      );

      const orders = await listCompanyOrdersUseCase.execute({page: Number(page), limit: Number(limit), companyId: _id});

      return res.status(200).json(orders);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { ListCompanyOrdersController };
