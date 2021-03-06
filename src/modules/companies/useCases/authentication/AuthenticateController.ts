import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';
import { AuthenticateUseCase } from './AuthenticateUseCase';

const logger = new Logger('AUTHENTICATE COMPANY');
class AuthenticateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const authenticateUseCase = container.resolve(AuthenticateUseCase);

      const authInfo = await authenticateUseCase.execute({
        email,
        password,
      });

      return res.status(201).json(authInfo);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message, 400)
    }
  }
}

export { AuthenticateController };
