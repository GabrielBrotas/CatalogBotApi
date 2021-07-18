import { AppError } from '../../../../shared/errors/AppError';
import { Request, Response } from  'express'
import { container } from 'tsyringe'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

class RefreshTokenController {

  async handle(request: Request, response: Response) {
    try {
      const { refresh_token } = request.body

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

      const token = await refreshTokenUseCase.execute(refresh_token)

      return response.status(200).json(token)

    } catch(err) {
      throw new AppError(err.message)
    }

  }
}
export { RefreshTokenController }
