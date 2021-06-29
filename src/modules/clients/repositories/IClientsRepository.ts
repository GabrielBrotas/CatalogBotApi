import {  IClient } from '../schemas/Client';

export interface ICreateClientDTO {
  name: string;
  email: string;
  password: string;
  cellphone: string;
}

export const USER_TYPES_ARRAY = [
  'defaultAddress'
] as const;
export type USER_TYPES = typeof USER_TYPES_ARRAY[number];

export interface IUpdateClientDTO {
  userId: string;
  set: { [key in USER_TYPES]?: any };
}

export interface IFindClientByEmailOrCellphoneDTO {
  user: string;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<void>;
  update(data: IUpdateClientDTO): Promise<void>;
  findById(_id: string): Promise<IClient>;
  findByEmail(email: string): Promise<IClient | null>;
  findByEmailOrCellphone({
    user,
  }: IFindClientByEmailOrCellphoneDTO): Promise<IClient | null>;
}
