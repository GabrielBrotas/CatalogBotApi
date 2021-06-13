import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemoveProductFromCartUseCase } from './RemoveProductFromCartUseCase';

class RemoveProductFromCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cartId, orderProductId } = req.params;
    const { _id } = req.user;

    try {
      const removeProductFromCart = container.resolve(
        RemoveProductFromCartUseCase,
      );

      const newOrder = await removeProductFromCart.execute({
        clientId: _id,
        cartId,
        orderProductId,
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { RemoveProductFromCartController };
