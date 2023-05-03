import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductDto } from "./DTOs/product.dto";
import { ProductService } from "./product.service";
import { ProductFiltersDto } from "./DTOs/product-filters.dto";
import { ProductSearchFilters } from "./types/ProductSearchFilters";
import { ProductQueryResponse } from "./types/ProductQueryResponse";

@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get("/")
  async getAllProducts(@Query() query: ProductSearchFilters): Promise<ProductQueryResponse> {
    return await this.productService.getAllProducts(query);
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<ProductDto> {
    return await this.productService.getProductById(id);
  }

  @Get("/category/:categoryName")
  async getProductsByCategory(@Param() categoryName: string): Promise<ProductDto[]> {
    return await this.productService.getProductsByCategory(categoryName);
  }

  @Get("filters")
  async getProductFilters(): Promise<ProductFiltersDto> {
    return await this.productService.getProductFilters();
  }
}
