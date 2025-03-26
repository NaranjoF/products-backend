import { Product } from '../domain/repository/product.repository.interface';

export interface ProductWithPriceUSD extends Product {
  price_usd: string;
}
