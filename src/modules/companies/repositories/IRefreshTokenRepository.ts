import { IRefreshToken } from "../schemas/RefreshToken";

export interface DeleteManyProps {
  where: {
    company?: string
    client?: string;
  }
}

export interface IRefreshTokenRepository {
  create(userId: string): Promise<IRefreshToken>;
  findOne(id: string): Promise<IRefreshToken | null>;
  deleteMany({where}: DeleteManyProps): Promise<void>
}
