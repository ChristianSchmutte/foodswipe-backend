import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class CreateMealDto {
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  // @IsUrl()
  image_url: string;
}
