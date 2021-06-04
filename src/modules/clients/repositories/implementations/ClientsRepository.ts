import { AppError } from '../../../../shared/errors/AppError';
import { Client, IClient } from '../../schemas/Client';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindClientByEmailOrCellphoneDTO,
} from '../IClientsRepository';

export class ClientsRepository implements IClientsRepository {
  private repository;

  constructor() {
    this.repository = Client;
  }

  async create({
    email,
    password,
    name,
    cellphone,
    defaultAddress,
  }: ICreateClientDTO): Promise<void> {
    await this.repository.create({
      email,
      password,
      name,
      cellphone,
      defaultAddress,
    });
  }

  async findById(_id: string): Promise<IClient> {
    const client = await this.repository.findOne({ _id });

    if (!client) throw new AppError('User not found', 404);

    return client;
  }

  async findByEmail(email: string): Promise<IClient | null> {
    const client = await this.repository.findOne({ email });
    return client;
  }

  async findByEmailOrCellphone({
    email,
    cellphone,
  }: IFindClientByEmailOrCellphoneDTO): Promise<IClient | null> {
    if (!email && !cellphone) return null;

    if (email) {
      const client = await this.repository.findOne({ email });
      if (!client) return null;
      return client;
    }

    if (cellphone) {
      const client = await this.repository.findOne({ cellphone });
      if (!client) return null;
      return client;
    }
    return null;
  }
}
