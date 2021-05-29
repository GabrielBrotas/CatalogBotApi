import {
  getMongoRepository,
  MongoRepository,
} from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { Company } from '../../entities/Company';
import {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyImageDTO,
} from '../ICompaniesRepository';

export class CompaniesRepository implements ICompaniesRepository {
  private repository: MongoRepository<Company>;

  constructor() {
    this.repository = getMongoRepository(Company);
  }

  async create({ email, password }: ICreateCompanyDTO): Promise<void> {
    const company = this.repository.create({
      email,
      password,
    });

    await this.repository.save(company);
  }

  async findByEmail(email: string): Promise<Company | undefined> {
    const company = await this.repository.findOne({ email });
    return company;
  }

  async findById(_id: string): Promise<Company | undefined> {
    const company = await this.repository.findOne(_id);
    return company;
  }

  async updateCompany({
    _id,
    benefits,
    name,
    shortDescription,
    workTime,
  }: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.repository.findOne(_id);

    if (!company) throw new AppError('Company not found', 404);

    company.benefits = benefits;
    company.name = name;
    company.shortDescription = shortDescription;
    company.workTime = workTime;

    await this.repository.save(company);

    return company;
  }

  async updateCompanyImage({
    _id,
    imageUrl
  }: IUpdateCompanyImageDTO): Promise<Company> {
    const company = await this.repository.findOne(_id);

    if (!company) throw new AppError('Company not found', 404);

    company.mainImageUrl = imageUrl;

    await this.repository.save(company);

    return company;
  }
}
