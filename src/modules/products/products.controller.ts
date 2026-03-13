import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Post()
  create(@Body() productData: any) {
    return this.productsService.create(productData);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() ProductData: any) {
    return this.productsService.update(id, ProductData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
