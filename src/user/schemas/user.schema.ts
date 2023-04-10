import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAddress } from './user-address.schema';
import { UserWishlist } from './user-wishlist.schema';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' }],
  })
  address: UserAddress[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserWishList' })
  wishlist: UserWishlist;
}

export const UserSchema = SchemaFactory.createForClass(User);
