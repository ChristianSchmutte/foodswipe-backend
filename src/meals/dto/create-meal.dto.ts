import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class CreateMealDto {
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
