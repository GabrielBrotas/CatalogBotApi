import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from '../../../../shared/middlewares/logger';
import { UpdateImageUseCase } from './UpdateImageUseCase';

const logger = new Logger('UPDATE COMPANY IMAGE');
class UpdateImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { _id } = request.user;
      const imageUrl = request.file.filename;

      const updateImageUseCase = container.resolve(UpdateImageUseCase);

      const company = await updateImageUseCase.execute({ _id, imageUrl });
      delete company.password;
      return response.status(200).json(company);
    } catch (err) {
      logger.error(err.message);
      return response.status(400).send(err.message);
    }
  }
}

export { UpdateImageController };
