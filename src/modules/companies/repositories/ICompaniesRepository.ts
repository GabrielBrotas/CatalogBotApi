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

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<void>;
  findByEmail(email: string): Promise<ICompany | null>;
  findById(id: string): Promise<ICompany | null>;
  updateCompany(data: IUpdateCompanyDTO): Promise<ICompany>;
  updateCompanyImage({
    _id,
    imageUrl,
  }: IUpdateCompanyImageDTO): Promise<ICompany>;
}

export {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyImageDTO,
};
