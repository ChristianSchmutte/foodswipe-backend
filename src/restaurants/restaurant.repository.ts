import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantCredentialsDto } from './dto/restaurant-credentials.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async register(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = new Restaurant();
    const keys = Object.keys(createRestaurantDto);
    keys.forEach((key) => (newRestaurant[key] = createRestaurantDto[key]));

    try {
      await newRestaurant.save();
      return newRestaurant;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already registered');
      } else {
        throw new InternalServerErrorException('Server error occured');
      }
    }
  }
  // TODO once works replace return type with smth like Promise<{ id: number, email: string }>
  async login(credentialsDto: RestaurantCredentialsDto): Promise<Restaurant> {
    const { email, password } = credentialsDto;
    const user = await Restaurant.findOne({ email });
    // TODO: encrypt password on Entity
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async updateRestaurant(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const updatedRestaurant = await Restaurant.findOne({ id });

    if (!updatedRestaurant)
      throw new NotFoundException(`Could not find restaurant with id ${id}`);

    const keys = Object.keys(updatedRestaurant);
    keys.forEach((key) => {
      updatedRestaurant[key] = updateRestaurantDto[key]
        ? updateRestaurantDto[key]
        : updatedRestaurant[key];
    });
    await updatedRestaurant.save();
    return updatedRestaurant;
  }
}
