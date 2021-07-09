import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Logger } from '../../../../shared/middlewares/logger';
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

const logger = new Logger('AUTHENTICATE CLIENT');
class AuthenticateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;
    try {
      const authenticateClientUseCase = container.resolve(
        AuthenticateClientUseCase,
      );

      const authInfo = await authenticateClientUseCase.execute({
        user,
        password,
      });

      return res.status(201).json(authInfo);
    } catch (err) {
      logger.error(err.message)
      throw new AppError(err.message);
    }
  }
}

export { AuthenticateClientController };
