export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  getByName(name: string): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
