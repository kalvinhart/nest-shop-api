import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Product } from "src/modules/product/schemas/product.schema";

@Schema()
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  total: number;
}
