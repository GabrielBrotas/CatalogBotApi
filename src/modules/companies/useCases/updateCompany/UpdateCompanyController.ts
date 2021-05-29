import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

class UpdateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.user;
      const { benefits, name, shortDescription, workTime } = req.body;
      const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

      const company = await updateCompanyUseCase.execute({
        _id,
        benefits,
        name,
        shortDescription,
        workTime,
      });

      return res.status(201).json(company);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export { UpdateCompanyController };
