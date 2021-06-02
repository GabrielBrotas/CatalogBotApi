import { injectable, inject } from 'tsyringe';
import {
  ICompaniesRepository,
  IUpdateCompanyDTO,
} from '../../repositories/ICompaniesRepository';
import { Company } from '../../entities/Company';
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
  }: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.companiesRepository.updateCompany({
      _id,
      benefits,
      name,
      shortDescription,
      workTime,
    });

    delete company.password;
    return company;
  }
}

export { UpdateCompanyUseCase };
