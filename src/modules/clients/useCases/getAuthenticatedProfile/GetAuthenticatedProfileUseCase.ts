import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IClient } from '../../schemas/Client';
import { IClientsRepository } from '../../repositories/IClientsRepository';
import { ClientMap } from '../../mapper/ClientMap';

@injectable()
class GetAuthenticatedProfileUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(_id: string): Promise<IClient> {
    const client = await this.clientsRepository.findById(_id);

    if (!client) throw new AppError('client not found', 404);

    return ClientMap.toDTO(client);
  }
}

export { GetAuthenticatedProfileUseCase };
