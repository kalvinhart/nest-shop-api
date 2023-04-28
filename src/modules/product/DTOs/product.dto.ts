import { ProductDocument } from '../schemas/product.schema';

export class ProductDto {
  constructor(product: ProductDocument) {
    this._id = product._id.toString();
    this.name = product.name;
    this.brand = product.brand;
    this.description = product.description;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.inStock = product.inStock;
  }

  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}
