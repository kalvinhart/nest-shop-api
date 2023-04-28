import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class UserAddress {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    required: true,
  })
  line1: string;

  @Prop()
  line2: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  county: string;

  @Prop({
    required: true,
  })
  country: string;

  @Prop({
    required: true,
    minlength: 5,
  })
  postCode: string;
}
