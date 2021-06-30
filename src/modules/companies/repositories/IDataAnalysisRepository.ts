import { IDataAnalysis } from "../schemas/DataAnalysis";

export interface ICreateDataAnalysisDTO {
  companyId: string;
  clientId?: string;
  orderId?: string;
  type: 'view' | 'order';
}

export interface IListDataAnalysisDTO {
  companyId: string;
}

export interface IDataAnalysisRepository {
  create(data: ICreateDataAnalysisDTO): Promise<void>;
  list(data: IListDataAnalysisDTO): Promise<IDataAnalysis[]>;
}
