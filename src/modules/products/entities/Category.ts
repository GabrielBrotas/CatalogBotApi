import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('categories')
class Category {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  companyId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Category };
