import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}
  register(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantRepository.register(createRestaurantDto);
  }

  login() {
    return `This logs in`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
