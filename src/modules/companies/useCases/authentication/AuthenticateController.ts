import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUseCase } from './AuthenticateUseCase';

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
      return res.status(400).send(err.message);
    }
  }
}

export { AuthenticateController };
