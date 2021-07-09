import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ClearCartUseCase } from './clearCartUseCase';

class ClearCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cartId } = req.params;
    const { _id } = req.user;

    try {
      const clearCart = container.resolve(ClearCartUseCase);

      await clearCart.execute({
        cartId,
        clientId: _id,
      });

      return res.status(200).send();
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { ClearCartController };
