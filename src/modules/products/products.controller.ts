import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationError,
  PipeTransform,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { REQUEST } from '@nestjs/core';

export class ValidationPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const id = this.request['params'].id;
    const { name } = value;
    if (name === 'sp1' && +id === 4) {
      throw new BadRequestException('Product name cannot be sp1 when id is 2');
    }
    return value;
  }
}

@Controller('products')
// @UsePipes(
//   new ValidationPipe({
//     transform: true,
//     exceptionFactory: (validationErrors: ValidationError[] = []) => {
//       return new BadRequestException(
//         validationErrors.map((error) => ({
//           [error.property]: Object.values(error.constraints || {})[0],
//         })),
//       );
//     },
//   }),
// )
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }
  @Post()
  create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) ProductData: UpdateProductDto,
  ) {
    return this.productsService.update(id, ProductData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.productsService.delete(id);
  }
}
