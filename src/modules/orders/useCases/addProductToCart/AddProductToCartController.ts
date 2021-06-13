import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AddProductToCartUseCase } from './AddProductToCartUseCase';

class AddProductToCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { orderProduct } = req.body;
    const { cId } = req.params;
    const { _id } = req.user;
    try {
      const addProductToCart = container.resolve(AddProductToCartUseCase);

      const newOrder = await addProductToCart.execute({
        clientId: _id,
        companyId: cId,
        orderProduct,
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { AddProductToCartController };
