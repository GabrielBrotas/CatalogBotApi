import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditCategoryUseCase } from './EditCategoryUseCase';

class EditCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { cId } = req.params;
    const { _id } = req.user;

    try {
      const editCategoryUseCase = container.resolve(EditCategoryUseCase);

      const category = await editCategoryUseCase.execute({
        companyId: _id,
        categoryId: cId,
        name,
      });

      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { EditCategoryController };
