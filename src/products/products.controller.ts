// src/products/products.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return await this.productsService.update(id, dto);
  }

  @Delete(':id/:deletedBy')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('deletedBy', ParseIntPipe) deletedBy: number,
  ) {
    return await this.productsService.remove(id, deletedBy);
  }

  @Put('toggle/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    console.log("api hit")
    return await this.productsService.toggleIsActive(id);
  }
}

