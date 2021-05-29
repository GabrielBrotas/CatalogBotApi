import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { EXPIRES_IN_TOKEN, SECRET_KEY } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { Company } from '../../entities/Company';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: Omit<Company, 'password'>;
  token: string;
}

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const company = await this.companiesRepository.findByEmail(email);

    if (!company) {
      throw new AppError('Invalid Email/Password combination.', 401);
    }

    if (!company.password) throw new AppError('Invalid Password', 400);

    const passwordMatch = await compare(password, company.password);

    if (!passwordMatch) {
      throw new AppError('Invalid Email/Password combination.', 401);
    }

    const token = sign({}, SECRET_KEY, {
      subject: String(company._id), // id do usuario
      expiresIn: EXPIRES_IN_TOKEN, // tempo de duração do token
    });

    return { company, token };
  }
}

export { AuthenticateUseCase };
