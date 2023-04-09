import { Product } from '../entities/product.entity';

export class ProductDto {
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.brand = product.brand;
    this.description = product.description;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.inStock = product.inStock;
  }

  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}
