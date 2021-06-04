import { IAddress, IClient } from '../schemas/Client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  cellphone?: string;
  defaultAddress?: IAddress;
}

export interface IFindClientByEmailOrCellphoneDTO {
  email?: string;
  cellphone?: string;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findById(_id: string): Promise<IClient>;
  findByEmail(email: string): Promise<IClient | null>;
  findByEmailOrCellphone({
    email,
    cellphone,
  }: IFindClientByEmailOrCellphoneDTO): Promise<IClient | null>;
}
