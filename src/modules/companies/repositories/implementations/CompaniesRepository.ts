import { APP_API_URL } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { Company, ICompany } from '../../schemas/Company';
import {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyImageDTO,
} from '../ICompaniesRepository';

export class CompaniesRepository implements ICompaniesRepository {
  private repository;

  constructor() {
    this.repository = Company;
  }

  async create({ email, password, name }: ICreateCompanyDTO): Promise<void> {
    await this.repository.create({
      email,
      password,
      name,
      roles: ['company'],
    });
  }

  async findByEmail(email: string): Promise<ICompany | null> {
    const company = await this.repository.findOne({ email }).exec();

    if (!company) return null;

    return company;
  }

  async findById(_id: string): Promise<ICompany | null> {
    const company = await this.repository.findOne({ _id }).exec();
    if (!company) return null;

    return company;
  }

  async updateCompany({
    _id,
    benefits,
    name,
    shortDescription,
    workTime,
  }: IUpdateCompanyDTO): Promise<ICompany> {
    const company = await this.repository.findOne({ _id }).exec();

    if (!company) throw new AppError('Company not found', 404);

    company.benefits = benefits;
    company.name = name;
    company.shortDescription = shortDescription;
    company.workTime = workTime;

    await company.save();

    return company;
  }

  async updateCompanyImage({
    _id,
    imageUrl,
  }: IUpdateCompanyImageDTO): Promise<ICompany> {
    const company = await this.repository.findOne({ _id }).exec();

    if (!company) throw new AppError('Company not found', 404);

    company.mainImageUrl = `${APP_API_URL}/files/${imageUrl}`;

    await company.save();

    return company;
  }
}
