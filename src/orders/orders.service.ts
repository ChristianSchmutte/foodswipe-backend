import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './order-status.enum';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly mealsService: MealsService,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<{
    orderId: number;
    status: OrderStatus;
    mealId: number;
    restaurantId: number;
  }> {
    const { mealId } = createOrderDto;
    const meal = await this.mealsService.findOne(mealId);
    if (!meal)
      throw new NotFoundException(`Could not find meal with id: ${mealId}`);
    const { restaurant } = meal;
    return this.orderRepository.createOrder(createOrderDto, meal, restaurant);
  }

  getOrders(filterOrderDto: FilterOrderDto) {
    return this.orderRepository.getOrders(filterOrderDto);
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
