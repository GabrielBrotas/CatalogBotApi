import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

const logger = new Logger('CREATE COMPANY');
class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

      await createCompanyUseCase.execute({
        email,
        password,
        name,
      });

      return res.status(201).send();
    } catch (err) {
      logger.error(err.message);
      throw new AppError(err.message, 400)

    }
  }
}

export { CreateCompanyController };
