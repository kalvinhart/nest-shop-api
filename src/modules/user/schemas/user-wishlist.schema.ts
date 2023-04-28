import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Product } from 'src/modules/product/schemas/product.schema';

@Schema({ timestamps: true })
export class UserWishlist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}
