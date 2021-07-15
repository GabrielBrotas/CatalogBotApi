import { injectable, inject } from 'tsyringe';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompany } from '../../schemas/Company';
import { CompanyMap } from '../../mapper/CompanyMap';

@injectable()
class GetMyCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute(_id: string): Promise<ICompany> {
    const company = await this.companiesRepository.findById(_id);

    if (!company) throw new AppError('company not found', 404);

    return CompanyMap.toDTO(company);
  }
}

export { GetMyCompanyUseCase };
