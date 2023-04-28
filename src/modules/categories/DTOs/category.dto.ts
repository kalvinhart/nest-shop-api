import { ObjectId } from 'mongoose';
import { CategoryDocument } from '../schemas/category.schema';

export class CategoryDto {
  constructor(category: CategoryDocument) {
    this._id = category._id.toString();
    this.name = category.name;
  }

  _id: string;
  name: string;
}
