import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductImageUseCase } from './UpdateProductImageUseCase';

class UpdateProductImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { _id } = request.user;
    const { pId } = request.params;
    const imageUrl = request.file.filename;

    const updateProductImageUseCase = container.resolve(
      UpdateProductImageUseCase,
    );

    const product = await updateProductImageUseCase.execute({
      _id: pId,
      imageUrl,
      companyId: _id,
    });

    return response.status(200).json(product);
  }
}

export { UpdateProductImageController };
