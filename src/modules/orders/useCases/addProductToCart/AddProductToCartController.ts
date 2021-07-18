import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from './../../../../shared/errors/AppError';
import { AddProductToCartUseCase } from './AddProductToCartUseCase';

class AddProductToCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { orderProduct } = req.body;
    const { companyId } = req.params;
    const { _id } = req.user;
    try {
      const addProductToCart = container.resolve(AddProductToCartUseCase);

      const newOrder = await addProductToCart.execute({
        clientId: _id,
        companyId,
        orderProduct,
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { AddProductToCartController };
