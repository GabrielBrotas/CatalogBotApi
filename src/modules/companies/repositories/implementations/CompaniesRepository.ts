import { AppError } from '../../../../shared/errors/AppError';
import { Company, ICompany } from '../../schemas/Company';
import {
  ICompaniesRepository,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
  IUpdateCompanyFlowDTO,
  IUpdateCompanyImageDTO,
} from '../ICompaniesRepository';

export class CompaniesRepository implements ICompaniesRepository {
  private repository;

  constructor() {
    this.repository = Company;
  }

  async create({ email, password, name }: ICreateCompanyDTO): Promise<ICompany> {
    const company = await this.repository.create({
      email,
      password,
      name,
      roles: ['company'],
      acceptedPaymentMethods: {
        money: true,
        pix: false,
        debit: false,
        creditCard: false,
        boleto: false,
      },
      Views: []
    });

    return company
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
    acceptedPaymentMethods,
  }: IUpdateCompanyDTO): Promise<ICompany> {
    const company = await this.repository.findOne({ _id }).exec();

    if (!company) throw new AppError('Company not found', 404);

    company.benefits = benefits;
    company.name = name;
    company.shortDescription = shortDescription;
    company.workTime = workTime;
    company.acceptedPaymentMethods = acceptedPaymentMethods;

    await company.save();

    return company;
  }

  async updateCompanyImage({
    _id,
    imageUrl,
  }: IUpdateCompanyImageDTO): Promise<ICompany> {
    const company = await this.repository.findOne({ _id }).exec();

    if (!company) throw new AppError('Company not found', 404);

    company.mainImageUrl = imageUrl

    await company.save();

    return company;
  }

  async updateFlow({companyId, set}: IUpdateCompanyFlowDTO): Promise<ICompany> {
    const company = await this.repository.findOne({ _id: companyId }).exec()

    if(!company) throw "company not found"

    company.flow = {...set}

    await company.save()

    return company
  }
}
