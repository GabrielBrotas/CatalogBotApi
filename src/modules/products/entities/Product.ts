import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';

export type OptionAdditional = {
  _id: string;
  name: string;
  price: number;
};

export type ProductOption = {
  _id: string;
  name: string;
  isRequired: boolean;
  maxQuantity: number;
  minQuantity: number;
  additionals: OptionAdditional[];
};

@Entity('products')
class Product {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  categoryId: string;

  @Column()
  imageUrl: string;

  @Column()
  options: ProductOption[];

  @Column()
  companyId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Product };
