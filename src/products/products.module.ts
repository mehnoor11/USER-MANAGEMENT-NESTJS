import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';  // Import SequelizeModule
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { ApiLog } from '../apilogs/models/apilogs.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, ApiLog])],  // Add your models here
  providers: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
