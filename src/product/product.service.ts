import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './DTOs/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProductById(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('Product not found.');

    return new ProductDto(product);
  }
}
