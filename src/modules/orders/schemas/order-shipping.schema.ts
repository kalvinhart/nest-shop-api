import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserAddress } from 'src/modules/user/schemas/user-address.schema';

@Schema()
export class OrderShipping {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;
}
