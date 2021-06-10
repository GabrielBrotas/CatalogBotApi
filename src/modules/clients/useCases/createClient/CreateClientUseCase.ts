import { injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';
import { AppError } from '../../../../shared/errors/AppError';

import {
  IClientsRepository,
  ICreateClientDTO,
} from '../../repositories/IClientsRepository';

@injectable()
class CreateClientUseCase {
  // vamos receber ele para nao ter que criar uma nova instancia e sobrescrever os dados anteriores
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    email,
    password,
    name,
    cellphone,
  }: ICreateClientDTO): Promise<void> {
    const emailAlreadyExists = await this.clientsRepository.findByEmail(email);

    if (emailAlreadyExists) throw new AppError('Email already in use');

    const passwordHash = await hash(password, 8);

    await this.clientsRepository.create({
      email,
      password: passwordHash,
      name,
      cellphone,
    });
  }
}

export { CreateClientUseCase };
