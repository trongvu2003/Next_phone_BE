import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export default class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
