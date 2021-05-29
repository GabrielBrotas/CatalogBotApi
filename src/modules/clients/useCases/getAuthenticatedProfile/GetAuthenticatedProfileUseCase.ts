import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Client } from '../../entities/Client';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
class GetAuthenticatedProfileUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(_id: string): Promise<Client> {
    const client = await this.clientsRepository.findById(_id);

    if (!client) throw new AppError('client not found', 404);

    delete client.password;
    return client;
  }
}

export { GetAuthenticatedProfileUseCase };
