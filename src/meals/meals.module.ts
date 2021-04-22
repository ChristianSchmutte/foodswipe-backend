import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { MealRepository } from './meal-repository';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), RestaurantsModule],
  controllers: [MealsController],
  providers: [MealsService, MealRepository, RestaurantsService],
  exports: [MealsService],
})
export class MealsModule {}
