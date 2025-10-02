import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product) private readonly productModel: typeof Product) {}

  async create(productData: CreationAttributes<Product>): Promise<Product> {
    return this.productModel.create(productData);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productModel.findByPk(id);
  }

  async update(product: Product, updates: Partial<Product>): Promise<Product> {
    return product.update(updates);
  }

  async save(product: Product): Promise<Product> {
    return product.save();
  }

  async softDelete(product: Product): Promise<void> {
    await product.save();
    await product.destroy();
  }
}
