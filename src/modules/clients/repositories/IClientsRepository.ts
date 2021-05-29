import { Address, Client } from '../entities/Client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  cellphone?: string;
  defaultAddress?: Address;
}

export interface IFindClientByEmailOrCellphoneDTO {
  email?: string;
  cellphone?: string;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(_id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findByEmailOrCellphone({
    email,
    cellphone,
  }: IFindClientByEmailOrCellphoneDTO): Promise<Client | undefined>;
}
