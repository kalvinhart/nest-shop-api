import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
