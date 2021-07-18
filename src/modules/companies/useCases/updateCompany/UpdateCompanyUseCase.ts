import { injectable, inject } from 'tsyringe';
import { CompanyMap } from '../../mapper/CompanyMap';
import {
  ICompaniesRepository,
  IUpdateCompanyDTO,
} from '../../repositories/ICompaniesRepository';
import { ICompany } from '../../schemas/Company';

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    _id,
    benefits,
    name,
    shortDescription,
    workTime,
    acceptedPaymentMethods,
  }: IUpdateCompanyDTO): Promise<ICompany> {
    const company = await this.companiesRepository.updateCompany({
      _id,
      benefits,
      name,
      shortDescription,
      workTime,
      acceptedPaymentMethods,
    });

    return CompanyMap.toDTO(company)
  }
}

export { UpdateCompanyUseCase };
