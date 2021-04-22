import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tags.repository';
import { MealsModule } from 'src/meals/meals.module';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
    MealsModule,
    RestaurantsModule,
  ],
  controllers: [TagsController],
  providers: [TagsService, MealsService],
  exports: [TagsService],
})
export class TagsModule {}
