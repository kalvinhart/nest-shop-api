import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
