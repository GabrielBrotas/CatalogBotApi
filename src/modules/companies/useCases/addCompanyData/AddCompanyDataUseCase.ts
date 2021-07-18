import { injectable, inject } from 'tsyringe';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IDataAnalysisRepository } from '../../repositories/IDataAnalysisRepository';

interface IRequest {
  clientId?: string
  orderId?: string
  companyId: string
  type: 'view' | 'order'
}

@injectable()
class AddCompanyDataUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('DataAnalysisRepository')
    private dataAnalysisRepository: IDataAnalysisRepository,
  ) {}

  async execute({companyId, clientId, orderId, type}: IRequest): Promise<void> {
    try {
      const company = await this.companiesRepository.findById(companyId)

      if(!company) throw new AppError("Company not found", 404)

      await this.dataAnalysisRepository.create({ companyId, clientId, orderId, type })
      return;
    } catch(err) {
      throw new AppError(err)
    }
  }
}

export { AddCompanyDataUseCase };
