import { Injectable } from '@nestjs/common';
import { Product } from '../domain/repository/product.repository.interface';
import { ProductWithPriceUSD } from '../action/controller.interfaces';

@Injectable()
export class ProductResponder {
  constructor() {}

  async formatGetAllResponse(
    products: Product[],
  ): Promise<ProductWithPriceUSD[]> {
    if (!products.length) {
      return [];
    }

    return products.map((product) => {
      return {
        ...product,
        price_usd: (product.price / Number(process.env.PRICE_USD)).toFixed(2),
      };
    });
  }

  async formatGetProductByIdResponse(
    product: Product,
  ): Promise<ProductWithPriceUSD> {
    return {
      ...product,
      price_usd: (product.price / Number(process.env.PRICE_USD)).toFixed(2),
    };
  }

  async formatCreateProductResponse(product: Product): Promise<Product> {
    return {
      ...product,
    };
  }

  async formatUpdateProductResponse(product: Product): Promise<Product> {
    return {
      ...product,
    };
  }

  async formatDeleteProductResponse(
    result: string,
  ): Promise<{ message: string }> {
    return { message: result };
  }
}
