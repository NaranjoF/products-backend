import { Injectable } from '@nestjs/common';
import { IProductRepository, Product } from './product.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async getByName(name: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { name } });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    if (Object.keys(product).length > 0) {
      await this.productRepository.update(id, product);
    }
    return await this.getById(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
