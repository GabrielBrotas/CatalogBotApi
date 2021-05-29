import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

      await createCompanyUseCase.execute({
        email,
        password
      });
      
      return res.status(201).send();
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { CreateCompanyController };
