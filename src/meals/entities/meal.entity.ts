import { Order } from 'src/orders/entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  image_url: string;

  @ManyToOne(() => Restaurant, (r) => r.meals, { eager: true })
  restaurant: Restaurant;

  @OneToMany(() => Order, (o) => o.meal, { eager: false })
  orders: Order;
}
