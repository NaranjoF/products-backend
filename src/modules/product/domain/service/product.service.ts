import {
  ConflictException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  IProductRepository,
  Product,
  PRODUCT_REPOSITORY,
} from '../repository/product.repository.interface';
import {
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  GET_ALL_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_ERROR,
  PRODUCT_ALREADY_EXISTS,
  PRODUCT_NOT_FOUND,
  UPDATE_PRODUCT_ERROR,
} from './service.errors';
import { SUCCESSFULLY_DELETED } from './service.constants';
import { IProductService } from './product.service.interface';

export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(GET_ALL_PRODUCTS_ERROR);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.getById(id);
      if (!product) {
        throw new NotFoundException(PRODUCT_NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(GET_PRODUCT_BY_ID_ERROR);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const existingProduct = await this.productRepository.getByName(
        product.name,
      );

      if (existingProduct) {
        throw new ConflictException(PRODUCT_ALREADY_EXISTS);
      }

      return await this.productRepository.create(product);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(CREATE_PRODUCT_ERROR);
    }
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    try {
      const existingProduct = await this.productRepository.getById(id);

      if (!existingProduct) {
        throw new NotFoundException(PRODUCT_NOT_FOUND);
      }

      return await this.productRepository.update(id, product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(UPDATE_PRODUCT_ERROR);
    }
  }

  async deleteProduct(id: number): Promise<string> {
    try {
      const existingProduct = await this.productRepository.getById(id);

      if (!existingProduct) {
        throw new NotFoundException(PRODUCT_NOT_FOUND);
      }

      await this.productRepository.delete(id);

      return SUCCESSFULLY_DELETED;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(DELETE_PRODUCT_ERROR);
    }
  }
}
