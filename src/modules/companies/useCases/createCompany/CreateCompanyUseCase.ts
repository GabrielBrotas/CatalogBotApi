import { injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository, ICreateCompanyDTO } from '../../repositories/ICompaniesRepository';

@injectable()
class CreateCompanyUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    email,
    password,
  }: ICreateCompanyDTO): Promise<void> {
    const emailAlreadyExists = await this.companiesRepository.findByEmail(email);

    if (emailAlreadyExists) throw new AppError('Email already in use');

    const passwordHash = await hash(password, 8);

    await this.companiesRepository.create({
      email,
      password: passwordHash,
    });
  }
}

export { CreateCompanyUseCase };
