import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from 'src/modules/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  brand: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  categories: Category[];

  @Prop()
  imageUrl: string;

  @Prop()
  inStock: boolean;

  @Prop()
  stockQty: number;

  @Prop()
  soldQty: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
