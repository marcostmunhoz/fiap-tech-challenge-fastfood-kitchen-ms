import { BaseEntity } from '@marcostmunhoz/fastfood-libs';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
