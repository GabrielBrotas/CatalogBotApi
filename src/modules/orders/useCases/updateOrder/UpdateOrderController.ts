import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { UpdateOrderUseCase } from './UpdateOrderUseCase';

class UpdateOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { oId } = req.params;
      const { order } = req.body;
      const { _id } = req.user;

      const updateOrderUseCase = container.resolve(UpdateOrderUseCase);
      console.log('here')
      const updatedOrder = await updateOrderUseCase.execute({
        orderId: oId,
        userId: _id,
        orderUpdated: order
      });

      return res.status(200).json(updatedOrder);
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { UpdateOrderController };
