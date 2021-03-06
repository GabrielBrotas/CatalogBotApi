import { AppError } from './../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { deliveryAddress, orderProducts, totalPrice, paymentMethod, saveAddressAsDefault } = req.body;
    const { cId } = req.params;
    const { _id } = req.user;

    try {
      const createOrderUseCase = container.resolve(CreateOrderUseCase);

      const newOrder = await createOrderUseCase.execute({
        clientId: _id,
        companyId: cId,
        deliveryAddress,
        orderProducts,
        totalPrice,
        paymentMethod,
        saveAddressAsDefault
      });

      console.log(newOrder)

      return res.status(201).json(newOrder);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { CreateOrderController };
