import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';
import { APP_API_URL } from '../../../config/constants';

export type WorkTime = {
  day: number;
  from: string;
  to: string;
};

@Entity('companies')
class Company {
  @ObjectIdColumn()
  _id: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column()
  name?: string;

  @Column()
  mainImageUrl?: string;

  @Column()
  workTime?: WorkTime[];

  @Column()
  shortDescription?: string;

  @Column()
  benefits?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export { Company };
