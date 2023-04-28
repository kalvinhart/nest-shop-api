import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './DTOs/create-category.dto';
import { CategoryDto } from './DTOs/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryModel.find({});

    return categories.map((category) => new CategoryDto(category));
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const newCategory: CategoryDocument = new this.categoryModel(createCategoryDto);

    return new CategoryDto(await newCategory.save());
  }

  async updateCategory(updateCategoryDto: CategoryDto): Promise<CategoryDto> {
    const { _id } = updateCategoryDto;
    const updatedCategory: CategoryDocument = await this.categoryModel.findByIdAndUpdate(_id, updateCategoryDto, {
      runValidators: true,
      new: true,
    });

    return new CategoryDto(updatedCategory);
  }

  async deleteCategory(id: string): Promise<void> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
