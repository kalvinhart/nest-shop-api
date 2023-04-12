import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAddress } from './user-address.schema';
import { UserWishlist } from './user-wishlist.schema';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;

  @Prop({
    minlength: 2,
  })
  firstName: string;

  @Prop({
    minlength: 2,
  })
  lastName: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' }],
  })
  address: UserAddress[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserWishList' })
  wishlist: UserWishlist;
}

export const UserSchema = SchemaFactory.createForClass(User);
