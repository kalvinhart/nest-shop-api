import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { OrderItem } from './order-item.schema';
import { HydratedDocument } from 'mongoose';
import { OrderShipping } from './order-shipping.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  piKey: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  total: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderShipping', required: true })
  shipping: OrderShipping;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
