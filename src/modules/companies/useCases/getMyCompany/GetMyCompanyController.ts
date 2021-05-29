import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetMyCompanyUseCase } from './GetMyCompanyUseCase';

class GetMyCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const getMyCompanyUseCase = container.resolve(GetMyCompanyUseCase);

      const company = await getMyCompanyUseCase.execute(_id);

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { GetMyCompanyController };
