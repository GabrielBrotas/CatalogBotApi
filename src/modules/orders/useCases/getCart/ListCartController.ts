import { AppError } from './../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCartUseCase } from './ListCartUseCase';

class ListCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;
    const { _id } = req.user;
    try {
      const listCart = container.resolve(ListCartUseCase);

      const cart = await listCart.execute({
        companyId,
        clientId: _id,
      });

      return res.status(200).json(cart);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { ListCartController };
