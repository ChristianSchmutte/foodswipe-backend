import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class UpdateOrderDto {
  @IsNotEmpty()
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
