import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class UserAddress {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  line1: string;

  @Prop()
  line2: string;

  @Prop()
  city: string;

  @Prop()
  county: string;

  @Prop()
  country: string;

  @Prop()
  postCode: string;
}
