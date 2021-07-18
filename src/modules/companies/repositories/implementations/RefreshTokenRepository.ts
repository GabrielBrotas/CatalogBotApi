import dayjs from 'dayjs'
import { AppError } from '../../../../shared/errors/AppError';
import { IRefreshToken, RefreshToken } from '../../schemas/RefreshToken';
import { DeleteManyProps, IRefreshTokenRepository } from '../IRefreshTokenRepository';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository;

  constructor() {
    this.repository = RefreshToken;
  }

  async create(userId: string): Promise<IRefreshToken> {
    try {
      const expiresIn = dayjs().add(15, 'day').unix()

      const generatedRefreshToken = await this.repository.create({
        company: userId,
        expiresIn,
      });

      return generatedRefreshToken

    } catch(err) {
      throw new AppError(err)
    }
  }

  async findOne(id: string): Promise<IRefreshToken | null> {
    try {
      const refreshToken = await this.repository.findOne({
        _id: id
      });

      return refreshToken

    } catch(err) {
      throw new AppError(err)
    }
  }

  async deleteMany({where}: DeleteManyProps): Promise<void> {
    if(where.client) {
      await this.repository.deleteMany({
        client: where.client
      })
    }

    if(where.company) {
      await this.repository.deleteMany({
        company: where.company
      })
    }
  }
}
