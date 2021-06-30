import { injectable, inject } from 'tsyringe';
import { IDataAnalysisRepository } from '../../repositories/IDataAnalysisRepository';
import { IDataAnalysis } from './../../schemas/DataAnalysis';

@injectable()
class ListMyCompanyDataAnalysisUseCase {
  constructor(
    @inject('DataAnalysisRepository')
    private dataAnalysisRepository: IDataAnalysisRepository,
  ) {}

  async execute(_id: string): Promise<IDataAnalysis[]> {
    const datas = await this.dataAnalysisRepository.list({companyId: _id})

    return datas;
  }
}

export { ListMyCompanyDataAnalysisUseCase };
