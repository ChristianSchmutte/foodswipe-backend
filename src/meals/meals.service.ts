import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { RestaurantRepository } from 'src/restaurants/restaurant.repository';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { MealRepository } from './meal-repository';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealRepository)
    private readonly mealRepository: MealRepository,
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const restaurant = await this.restaurantRepository.getById(
      createMealDto.restaurantId,
    );
    return this.mealRepository.createMeal(createMealDto, restaurant);
  }

  getMeals(): Promise<Meal[]> {
    return this.mealRepository.getMeals();
  }

  findOne(id: number): Promise<Meal> {
    return this.mealRepository.getMealById(id);
  }

  updateMeal(id: number, updateMealDto: UpdateMealDto): Promise<Meal> {
    return this.mealRepository.updateMeal(id, updateMealDto);
  }

  deleteMeal(id: number) {
    return this.mealRepository.deleteMeal(id);
  }
}
