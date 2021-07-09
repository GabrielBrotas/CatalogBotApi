import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    const { _id } = req.user;

    try {
      const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

      await deleteCategoryUseCase.execute({
        categoryId: categoryId,
        companyId: _id,
      });

      return res.status(200).send();
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { DeleteCategoryController };
