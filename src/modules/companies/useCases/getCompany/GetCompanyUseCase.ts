import { injectable, inject } from 'tsyringe';
import {
  ICompaniesRepository,
  ICreateCompanyDTO,
} from '../../repositories/ICompaniesRepository';
import { Company } from '../../entities/Company';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class GetCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute(_id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(_id);

    if (!company) throw new AppError('company not found', 404);

    delete company.password;
    return company;
  }
}

export { GetCompanyUseCase };
