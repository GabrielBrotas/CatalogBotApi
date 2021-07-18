import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { UpdateProductCartUseCase } from './UpdateProductCartUseCase';

class UpdateProductCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { orderProducts } = req.body;
    const { cartId } = req.params;
    const { _id } = req.user;
    try {
      const updateProductToCart = container.resolve(UpdateProductCartUseCase);

      const cartUpdated = await updateProductToCart.execute({
        cartId,
        clientId: _id,
        orderProducts,
      });

      return res.status(200).json(cartUpdated);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { UpdateProductCartController };
