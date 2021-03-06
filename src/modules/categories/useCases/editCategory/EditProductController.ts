import { AppError } from './../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditCategoryUseCase } from './EditCategoryUseCase';

class EditCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { categoryId } = req.params;
    const { _id } = req.user;

    try {
      const editCategoryUseCase = container.resolve(EditCategoryUseCase);

      const category = await editCategoryUseCase.execute({
        companyId: _id,
        categoryId: categoryId,
        name,
      });

      return res.status(201).json(category);
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { EditCategoryController };
