import { getMongoRepository, MongoRepository } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { Client } from '../../schemas/Client';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindClientByEmailOrCellphoneDTO,
} from '../IClientsRepository';

export class ClientsRepository implements IClientsRepository {
  private repository: MongoRepository<Client>;

  constructor() {
    this.repository = getMongoRepository(Client);
  }

  async create({
    email,
    password,
    name,
    cellphone,
    defaultAddress,
  }: ICreateClientDTO): Promise<void> {
    const client = this.repository.create({
      email,
      password,
      name,
      cellphone,
      defaultAddress,
    });

    await this.repository.save(client);
  }

  async findById(_id: string): Promise<Client> {
    const client = await this.repository.findOne(_id);

    if (!client) throw new AppError('User not found', 404);

    return client;
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ email });
    return client;
  }

  async findByEmailOrCellphone({
    email,
    cellphone,
  }: IFindClientByEmailOrCellphoneDTO): Promise<Client | undefined> {
    if (!email && !cellphone) return undefined;

    if (email) {
      const client = await this.repository.findOne({ email });
      return client;
    }

    if (cellphone) {
      const client = await this.repository.findOne({ cellphone });
      return client;
    }
  }
}
