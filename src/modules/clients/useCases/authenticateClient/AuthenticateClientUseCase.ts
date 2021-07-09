import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { EXPIRES_IN_TOKEN, SECRET_KEY } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { IClientsRepository } from '../../repositories/IClientsRepository';
import { IClient } from '../../schemas/Client';

interface IRequest {
  user: string;
  password: string;
}

interface IResponse {
  client: Omit<IClient, 'password'>;
  token: string;
}

@injectable()
class AuthenticateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({ user, password }: IRequest): Promise<IResponse> {
    const client = await this.clientsRepository.findByEmailOrCellphone({
      user,
    });

    if (!client) {
      throw new AppError('Invalid Email/Password combination.', 401);
    }

    if (!client.password) throw new AppError('Invalid Password', 400);

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError('Invalid Email/Password combination.', 401);
    }

    const token = sign({}, SECRET_KEY as string, {
      subject: String(client._id), // id do usuario
      expiresIn: EXPIRES_IN_TOKEN, // tempo de duração do token
    });

    delete client.password;

    return { client, token };
  }
}

export { AuthenticateClientUseCase };
