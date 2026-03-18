import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class IsUppercaseConstraint implements ValidatorConstraintInterface {
  validate(value: string, ValidationArguments: ValidationArguments) {
    return value === value.toUpperCase();
  }
}

export default class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  //   @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  @Validate(IsUppercaseConstraint, { message: 'Name must be uppercase' })
  name!: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  price!: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description!: string;
}
