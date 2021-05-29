import { Company, WorkTime } from '../entities/Company';

interface ICreateCompanyDTO {
  email: string;
  password: string;
}

interface IUpdateCompanyDTO {
  _id: string;
  name?: string;
  workTime?: WorkTime[];
  shortDescription?: string;
  benefits?: string;
}

interface IUpdateCompanyImageDTO {
  _id: string;
  imageUrl: string;
}

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<void>;
  findByEmail(email: string): Promise<Company | undefined>;
  findById(id: string): Promise<Company | undefined>;
  updateCompany(data: IUpdateCompanyDTO): Promise<Company>;
  updateCompanyImage({
    _id,
    imageUrl,
  }: IUpdateCompanyImageDTO): Promise<Company>;
}

export {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyImageDTO,
};
