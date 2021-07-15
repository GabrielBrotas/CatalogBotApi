import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { EXPIRES_IN_TOKEN, SECRET_KEY } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { ICompany } from '../../schemas/Company';
import { CompanyMap } from '../../mapper/CompanyMap';
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository';
import { IRefreshToken } from '../../schemas/RefreshToken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: Omit<ICompany, 'password'>;
  token: string;
  refreshToken: IRefreshToken
}

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
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

    const token = sign({ roles: company.roles }, SECRET_KEY as string, {
      subject: String(company._id), // id do usuario
      expiresIn: EXPIRES_IN_TOKEN, // tempo de duração do token
    });

    await this.refreshTokenRepository.deleteMany({
      where: {
        company: String(company._id),
      }
    })

    const refreshToken = await this.refreshTokenRepository.create(company._id)

    return {
      company: CompanyMap.toDTO(company),
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUseCase };
