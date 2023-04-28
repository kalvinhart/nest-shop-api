import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './DTOs/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductSearchFilters } from './types/ProductSearchFilters';
import { ProductQueryResponse } from './types/ProductQueryResponse';
import { ProductUtilities } from './utils/ProductUtilities';
import { CreateProductDto } from './DTOs/create-product.dto';
import { UpdateProductDto } from './DTOs/update-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(
    searchFilters: ProductSearchFilters,
  ): Promise<ProductQueryResponse> {
    const { page, pageSize } = searchFilters;

    let query = this.productModel.find();
    query = ProductUtilities.buildQueryFromSearchFilters(query, searchFilters);

    const queryCount = await query.clone().count();
    const queryResponse = await query.exec();
    const totalPages = Math.ceil(queryCount / pageSize);

    const response = {
      products: queryResponse.map((product) => new ProductDto(product)),
      pagination: {
        currentPage: page,
        pageSize,
        resultsCount: queryCount,
        totalPages,
      },
    };

    return response;
  }

  async getProductById(id: string): Promise<ProductDto> {
    const product: ProductDocument = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found.');

    return new ProductDto(product);
  }

  async getProductsByCategory(categoryName: string): Promise<ProductDto[]> {
    const products = await this.productModel.find({
      categories: { $in: [categoryName] },
    });

    return products.map((product) => new ProductDto(product));
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const newProduct = new this.productModel(createProductDto);
    const savedProduct = await newProduct.save();

    return new ProductDto(savedProduct);
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<ProductDto> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      updateProductDto._id,
      updateProductDto,
      {
        runValidators: true,
        new: true,
      },
    );

    return new ProductDto(updatedProduct);
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.productModel.findByIdAndDelete(productId);
  }

  async deleteManyProducts(productIds: string[]): Promise<void> {
    await this.productModel.deleteMany({ _id: { $in: productIds } });
  }
}
