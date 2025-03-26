import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../domain/service/product.service';
import { Product } from '../domain/repository/product.repository.interface';
import { ProductWithPriceUSD } from './controller.interfaces';

import { CreateProductDto } from './dtos/create.product.dto';
import { MapperService } from '../domain/mapper.service';
import { UpdateProductDto } from './dtos/update.product.dto';
import { ProductResponder } from '../responders/product.responder';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productResponder: ProductResponder,
    private readonly mapperService: MapperService,
  ) {}

  @Get()
  async getAllProducts(): Promise<ProductWithPriceUSD[]> {
    const products = await this.productService.getAllProducts();
    return await this.productResponder.formatGetAllResponse(products);
  }

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductWithPriceUSD> {
    const product = await this.productService.getProductById(id);
    return await this.productResponder.formatGetProductByIdResponse(product);
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    const productToCreate = this.mapperService.dtoToClass(dto, new Product());

    const product = await this.productService.createProduct(productToCreate);

    return await this.productResponder.formatCreateProductResponse(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    const productToUpdate = this.mapperService.dtoToClass(dto, new Product());

    const product = await this.productService.updateProduct(
      id,
      productToUpdate,
    );

    return await this.productResponder.formatUpdateProductResponse(product);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const result = await this.productService.deleteProduct(id);

    return await this.productResponder.formatDeleteProductResponse(result);
  }
}
