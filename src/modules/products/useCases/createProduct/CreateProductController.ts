import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, price, options, categoryId } = req.body;
    const { _id } = req.user;

    try {
      const createProductUseCase = container.resolve(CreateProductUseCase);

      const newProduct = await createProductUseCase.execute({
        name,
        description,
        price,
        options,
        companyId: _id,
        categoryId
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { CreateProductController };
