import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetCompanyUseCase } from './GetCompanyUseCase';

class GetCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getCompanyUseCase = container.resolve(GetCompanyUseCase);

      const company = await getCompanyUseCase.execute(id);

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { GetCompanyController };
