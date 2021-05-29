import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password, name, cellphone, defaultAddress } = req.body;
    try {
      const createClientUseCase = container.resolve(CreateClientUseCase);

      await createClientUseCase.execute({
        email,
        password,
        name,
        cellphone,
        defaultAddress,
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { CreateClientController };
