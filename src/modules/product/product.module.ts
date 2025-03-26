import { Module } from '@nestjs/common';
import { ProductController } from './action/product.controller';
import { ProductService } from './domain/service/product.service';
import { PRODUCT_REPOSITORY } from './domain/repository/product.repository.interface';
import { ProductRepository } from './domain/repository/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/repository/product.entity';
import { ProductResponser } from './responders/product.responser';
import { MapperService } from './domain/mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  exports: [],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    ProductResponser,
    MapperService,
  ],
})
export class ProductModule {}
