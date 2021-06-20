import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditProductUseCase } from './EditProductUseCase';

class EditProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { description, name, options, price, categoryId } = req.body;
    const { pId } = req.params;
    const { _id } = req.user;

    try {
      const editProductUseCase = container.resolve(EditProductUseCase);

      const newProduct = await editProductUseCase.execute({
        companyId: _id,
        productId: pId,
        description,
        name,
        options,
        price,
        categoryId
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { EditProductController };
