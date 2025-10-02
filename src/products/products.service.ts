// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async create(dto: CreateProductDto) {
    return this.productsRepo.create(dto as any);
  }

  async findAll() {
    return this.productsRepo.findAll();
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productsRepo.update(product, dto);
  }

  async remove(id: number, deletedBy: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    product.DeletedBy = deletedBy;
    product.isActive = false;
    product.deletedAt = new Date();

    await this.productsRepo.softDelete(product);

    return { success: true, message: 'Product soft deleted' };
  }

  async toggleIsActive(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    product.isActive = !product.isActive;
    await this.productsRepo.save(product);

    return product;
  }
}
