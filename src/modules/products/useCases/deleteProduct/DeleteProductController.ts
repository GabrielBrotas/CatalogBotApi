import { AppError } from './../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { pId } = req.params;
    const { _id } = req.user;

    try {
      const deleteProductUseCase = container.resolve(DeleteProductUseCase);

      await deleteProductUseCase.execute({
        productId: pId,
        companyId: _id,
      });

      return res.status(200).send();
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { DeleteProductController };
