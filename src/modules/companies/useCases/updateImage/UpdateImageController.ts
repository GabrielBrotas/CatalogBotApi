import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateImageUseCase } from './UpdateImageUseCase';

class UpdateImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { _id } = request.user;
    const imageUrl = request.file.filename;

    const updateImageUseCase = container.resolve(UpdateImageUseCase);

    const company = await updateImageUseCase.execute({ _id, imageUrl });
    delete company.password;
    return response.status(200).json(company);
  }
}

export { UpdateImageController };
