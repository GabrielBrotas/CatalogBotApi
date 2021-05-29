import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';

export type Address = {
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  number: string;
  cep: string;
};

@Entity('clients')
class Client {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column()
  cellphone: string;

  @Column()
  defaultAddress?: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Client };
