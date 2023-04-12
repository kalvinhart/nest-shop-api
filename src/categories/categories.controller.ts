import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './DTOs/create-category.dto';
import { CategoryDto } from './DTOs/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    try {
      return await this.categoryService.getAllCategories();
    } catch (error) {
      return new BadRequestException(
        'An error occurred retrieving all categories.',
      );
    }
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.createCategory(createCategoryDto);
    } catch (error) {
      return new BadRequestException(
        'An error occurred creating a new category.',
      );
    }
  }

  @Put()
  async updateCategory(@Body() updateCategoryDto: CategoryDto) {
    try {
      return await this.categoryService.updateCategory(updateCategoryDto);
    } catch (error) {
      return new BadRequestException('An error occurred updating category.');
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (error) {
      return new BadRequestException('An error occurred deleting category.');
    }
  }
}
