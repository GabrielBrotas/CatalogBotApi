
import { IClient } from './../schemas/Client';

type IClientResponse = Omit<IClient, 'password'>

class ClientMap {
  static toDTO({
    _id,
    cellphone,
    email,
    name,
    defaultAddress,
    created_at
  }: IClient): IClientResponse {
    const client = {
      _id,
      cellphone,
      email,
      name,
      defaultAddress,
      created_at
    };
    return client;
  }
}

export { ClientMap };
