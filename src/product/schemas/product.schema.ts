import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

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
