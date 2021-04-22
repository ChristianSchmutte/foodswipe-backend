import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly mealsService: MealsService,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { mealId } = createOrderDto;
    const meal = await this.mealsService.findOne(mealId);
    if (!meal)
      throw new NotFoundException(`Could not find meal with id: ${mealId}`);
    const { restaurant } = meal;
    console.log('Do You have id?', meal.restaurant);
    return this.orderRepository.createOrder(createOrderDto, meal, restaurant);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
