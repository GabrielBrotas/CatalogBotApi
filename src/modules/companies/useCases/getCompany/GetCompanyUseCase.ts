import { injectable, inject } from 'tsyringe';
import {
  ICompaniesRepository,
} from '../../repositories/ICompaniesRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompany } from '../../schemas/Company';

@injectable()
class GetCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute(_id: string): Promise<ICompany> {
    const company = await this.companiesRepository.findById(_id);

    if (!company) throw new AppError('company not found', 404);

    return company;
  }
}

export { GetCompanyUseCase };
