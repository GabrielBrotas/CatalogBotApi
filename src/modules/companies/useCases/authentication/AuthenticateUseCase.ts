import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { EXPIRES_IN_TOKEN, SECRET_KEY } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { ICompany } from '../../schemas/Company';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: Omit<ICompany, 'password'>;
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

    return {
      company: {
        _id: company._id,
        email: company.email,
        name: company.name,
        workTime: company.workTime,
        shortDescription: company.shortDescription,
        benefits: company.benefits,
        created_at: company.created_at,
      },
      token,
    };
  }
}

export { AuthenticateUseCase };
