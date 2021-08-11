import { ICompany } from './../../schemas/Company';
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../../../modules/companies/repositories/ICompaniesRepository';

interface IRequest {
  CompanyID: string
  flow: {
    '1': string,
    '2': string,
    '2-1-1': string,
    '2-1-2': string,
    '2-2-1': string,
    '2-2-2': string,
    '2-3-1': string,
    '2-3-2': string,
    '2-4': string,
    '3-1': string,
    '3-2': string,
    '3-3': string,
    '3-4': string,
  }
}

@injectable()
class UpdateCompanyFlowUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    CompanyID,
    flow
  }: IRequest): Promise<ICompany> {

    try {
      const flowUpdated = await this.companiesRepository.updateFlow({
        companyId: CompanyID,
        set: flow
      })

      return flowUpdated
    } catch(err) {
      console.log(err)
      throw new AppError(err, 400)
    }
  }
}

export { UpdateCompanyFlowUseCase };
