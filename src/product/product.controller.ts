import { Controller, Get, Param } from '@nestjs/common';
import { ProductDto } from './DTOs/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getProductById(id);
  }
}
