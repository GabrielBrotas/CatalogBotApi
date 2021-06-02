import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { _id } = req.user;

    try {
      const createProductUseCase = container.resolve(CreateCategoryUseCase);

      const newProduct = await createProductUseCase.execute({
        name,
        companyId: _id,
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { CreateCategoryController };
