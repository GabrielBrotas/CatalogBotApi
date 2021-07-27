import { CompanyPaymentMethods, ICompany, WorkTime } from '../schemas/Company';

interface ICreateCompanyDTO {
  name: string;
  email: string;
  password: string;
}

interface IUpdateCompanyDTO {
  _id: string;
  name: string;
  workTime: WorkTime[];
  shortDescription?: string;
  benefits: string[];
  acceptedPaymentMethods: CompanyPaymentMethods;
}

interface IUpdateCompanyImageDTO {
  _id: string;
  imageUrl: string;
}

export interface IUpdateCompanyFlowDTO {
  companyId: string
  set: {
    '1': string,
    '2': string,
    '2-1-2': string,
    '2-2-1': string,
    '2-2-2': string,
    '2-3-1': string,
    '2-3-2': string,
    '2-4': string,
  }
}

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<ICompany>;
  findByEmail(email: string): Promise<ICompany | null>;
  findById(id: string): Promise<ICompany | null>;
  updateCompany(data: IUpdateCompanyDTO): Promise<ICompany>;
  updateCompanyImage({
    _id,
    imageUrl,
  }: IUpdateCompanyImageDTO): Promise<ICompany>;
  updateFlow(data: IUpdateCompanyFlowDTO): Promise<ICompany>;
}

export {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyImageDTO,
};
