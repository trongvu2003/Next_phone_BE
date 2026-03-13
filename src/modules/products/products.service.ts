import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}
  findAll() {
    return this.productsRepository.find();
  }
  create(productData: Partial<Products>) {
    const product = this.productsRepository.create(productData);
    product.createdAt = new Date();
    product.updatedAt = new Date();
    return this.productsRepository.save(product);
  }

  async update(id: number, productData: Partial<Products>) {
    productData.updatedAt = new Date();
    await this.productsRepository.update(id, productData);
    return this.productsRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const product = this.productsRepository.findOneBy({ id });
    await this.productsRepository.delete(id);
    return product;
  }
}
