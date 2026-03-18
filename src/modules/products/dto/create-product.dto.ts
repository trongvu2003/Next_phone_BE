import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export default class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  name!: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  price!: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description!: string;
}
