import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './DTOs/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProductById(id: string): Promise<ProductDto> {
    const product: ProductDocument = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found.');

    return new ProductDto(product);
  }
}
