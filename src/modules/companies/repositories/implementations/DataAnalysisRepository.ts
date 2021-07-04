import { AppError } from '../../../../shared/errors/AppError';
import { DataAnalysis, IDataAnalysis } from '../../schemas/DataAnalysis';
import { IDataAnalysisRepository, ICreateDataAnalysisDTO, IListDataAnalysisDTO} from '../IDataAnalysisRepository';

export class DataAnalysisRepository implements IDataAnalysisRepository {
  private repository;

  constructor() {
    this.repository = DataAnalysis;
  }

  async create({ companyId, clientId, type, orderId }: ICreateDataAnalysisDTO): Promise<void> {
    await this.repository.create({
      company: companyId,
      type,
      ...(clientId && {client: clientId}),
      ...(orderId && {order: orderId}),
    });
  }


  async list({ companyId }: IListDataAnalysisDTO): Promise<IDataAnalysis[]> {
    const datas = await this.repository.find({ company: companyId }).sort({ created_at: 1 })

    return datas
  }

}
