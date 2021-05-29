import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

class AuthenticateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, cellphone, password } = req.body;
    try {
      const authenticateClientUseCase = container.resolve(
        AuthenticateClientUseCase,
      );

      const authInfo = await authenticateClientUseCase.execute({
        email,
        cellphone,
        password,
      });

      return res.status(201).json(authInfo);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { AuthenticateClientController };
