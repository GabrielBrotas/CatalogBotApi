import {  IClient } from '../schemas/Client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  cellphone: string;
}

export interface IFindClientByEmailOrCellphoneDTO {
  user: string;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(_id: string): Promise<IClient>;
  findByEmail(email: string): Promise<IClient | null>;
  findByEmailOrCellphone({
    user,
  }: IFindClientByEmailOrCellphoneDTO): Promise<IClient | null>;
}
