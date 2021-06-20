import { injectable, inject } from 'tsyringe';
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

    delete company.password;
    return company;
  }
}

export { UpdateCompanyUseCase };
