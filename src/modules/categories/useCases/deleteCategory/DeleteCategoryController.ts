import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cId } = req.params;
    const { _id } = req.user;

    try {
      const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

      await deleteCategoryUseCase.execute({
        categoryId: cId,
        companyId: _id,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { DeleteCategoryController };
