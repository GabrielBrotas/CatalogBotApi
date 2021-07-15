import dayjs from 'dayjs'
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { EXPIRES_IN_TOKEN, SECRET_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}
  async execute(refresh_token: string) {

    const refreshToken = await this.refreshTokenRepository.findOne(refresh_token)

    if(!refreshToken) throw new AppError('RefreshToken not found', 404)

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const token = sign({ roles: 'company' }, SECRET_KEY as string, {
      subject: String(refreshToken.company), // id do usuario
      expiresIn: EXPIRES_IN_TOKEN, // tempo de duração do token
    });

    if(refreshTokenExpired) {
      await this.refreshTokenRepository.deleteMany({
        where: {
          company: refreshToken.company,
        }
      })

      const newRefreshToken = await this.refreshTokenRepository.create(refreshToken.company)

      return { token, refreshToken: newRefreshToken }
    }


    return { token }
  }
}
export { RefreshTokenUseCase }
