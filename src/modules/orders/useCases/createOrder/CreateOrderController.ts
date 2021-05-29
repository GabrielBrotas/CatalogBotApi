import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { comment, deliveryAddress, orderProducts, totalPrice, paymentMethod } = req.body;
    const { cId } = req.params;
    const { _id } = req.user;

    try {
      const createOrderUseCase = container.resolve(CreateOrderUseCase);

      const newOrder = await createOrderUseCase.execute({
        clientId: _id,
        companyId: cId,
        comment,
        deliveryAddress,
        orderProducts,
        totalPrice,
        paymentMethod
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { CreateOrderController };
