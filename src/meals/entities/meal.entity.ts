import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Restaurant, (r) => r.meals, { eager: false })
  restaurant: Restaurant;
}
