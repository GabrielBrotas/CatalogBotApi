import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { DeleteOrderUseCase } from './DeleteOrderUseCase';

class DeleteOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { oId } = req.params;
      const { _id } = req.user;

      const deleteOrderUseCase = container.resolve(DeleteOrderUseCase);

      const canceledOrder = await deleteOrderUseCase.execute({
        orderId: oId,
        userId: _id,
      });

      return res.status(200).json(canceledOrder);
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { DeleteOrderController };
