import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateProductDto {
  id?: number;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name?: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
