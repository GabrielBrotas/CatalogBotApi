import { AppError } from '../../../../shared/errors/AppError';
import { Client, IClient } from '../../schemas/Client';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindClientByEmailOrCellphoneDTO,
  IUpdateClientDTO,
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
  }: ICreateClientDTO): Promise<void> {
    await this.repository.create({
      email,
      password,
      name,
      cellphone,
      roles: ['client'],
    });
  }

  async update({userId, set}: IUpdateClientDTO): Promise<void> {
    const client = await this.repository.findOne({ _id: userId });
    if (!client) throw new AppError('User not found', 404);

    if(set.defaultAddress){
      client.defaultAddress = set.defaultAddress
    }
    
    await client.save()
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
    user,
  }: IFindClientByEmailOrCellphoneDTO): Promise<IClient | null> {
    let client = null;

    client = await this.repository.findOne({ email: user });
    if (client) return client;

    client = await this.repository.findOne({ cellphone: user });

    if (!client) return null;
    return client;
  }
}
