import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Product } from 'src/product/schemas/product.schema';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserWishlist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}
