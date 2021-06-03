// import { Schema } from 'mongoose';
// import {
//   Entity,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ObjectIdColumn,
//   Column,
// } from 'typeorm';
// import { Address } from '../../clients/entities/Client';
// import { OptionAdditional, Product } from '../../products/entities/Product';

// export type PickedOptions = {
//   productOptionName: string;
//   optionAdditional: OptionAdditional;
//   quantity: number;
// }

// export type OrderProduct = {
//   product: Product
//   amount: string;
//   pickedOptions: PickedOptions[]
// }

// export type OrderStatus =
//   | 'pending'
//   | 'confimed'
//   | 'sent'
//   | 'received'
//   | 'canceled';

// export type PaymentMethods =
//   | 'boleto'
//   | 'creditCard'
//   | 'debit'
//   | 'pix'
//   | 'money';

// @Entity('orders')
// class Order {
//   @ObjectIdColumn()
//   _id: string;

//   @Column()
//   clientId: string;

//   @Column()
//   companyId: string;

//   @Column()
//   orderProducts: OrderProduct[];

//   @Column()
//   totalPrice: number;

//   @Column()
//   comment?: string;

//   @Column()
//   paymentMethod: PaymentMethods;

//   @Column()
//   deliveryAddress: Address;

//   @Column()
//   status: OrderStatus;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }

// export { Order };


// const CompanySchema = new Schema({
//   clientId: {
//     type: String,
//     required: true
//   },
//   companyId: {
//     type: String,
//     required: true
//   },
//   orderProducts: {
//     product: Product
//     amount: string;
//     pickedOptions: PickedOptions[]
//   }
//   totalPrice: {
//     type: String,
//     required: true
//   },
//   comment?: {
//     type: String,
//     required: true
//   },
//   paymentMethod: {
//     type: String,
//     required: true
//   },
//   deliveryAddress: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     required: true
//   },
//   created_at: {
//     type: Date,
//     default: Date.now(),
//   }
// })
