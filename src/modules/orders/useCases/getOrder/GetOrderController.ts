import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { GetOrderUseCase } from './GetOrderUseCase';

class GetOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;
    const { _id } = req.user;

    try {
      const getOrder = container.resolve(GetOrderUseCase);

      const order = await getOrder.execute({
        orderId,
        userId: _id,
      });

      return res.status(201).json(order);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { GetOrderController };
