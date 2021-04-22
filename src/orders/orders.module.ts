import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { MealsModule } from 'src/meals/meals.module';
import { MealsService } from 'src/meals/meals.service';
import { MealRepository } from 'src/meals/meal.repository';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    MealsModule,
    RestaurantsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MealsService, MealRepository, RestaurantsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
