import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Config } from '../core/enums/Config';
import { StripeConfig } from '../core/types/StripeConfig';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';
import { UserDto } from '../user/DTOs/user.dto';

@Injectable()
export class PaymentsService {
  stripe: Stripe;
  stripeConfig: StripeConfig;
  stripeKey: string;
  endpointSecretKey: string;

  constructor(private configService: ConfigService, @InjectModel(Order.name) private orderModel: Model<Order>) {
    this.stripeConfig = this.configService.get<StripeConfig>(Config.STRIPE);
    this.stripeKey = this.stripeConfig.stripeSecretKey;
    this.endpointSecretKey = this.stripeConfig.secretKey;
    this.stripe = new Stripe(this.stripeKey, { apiVersion: '2022-11-15' });
  }

  async createPaymentIntent({
    user,
    items,
    total,
  }: {
    user: UserDto;
    items: any;
    total: number;
  }): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.create({
      amount: total,
      currency: 'gbp',
      payment_method_types: ['card'],
      receipt_email: user.email,
      metadata: { userId: user._id, userEmail: user.email, items },
    });
  }

  async handleWebhook(event: string, signature: string) {
    let constructedEvent: Stripe.Event;

    if (this.endpointSecretKey) {
      constructedEvent = this.stripe.webhooks.constructEvent(event, signature, this.endpointSecretKey);
    }

    if (constructedEvent.type === 'payment_intent.succeeded') {
      const paymentIntent = constructedEvent.data.object as Stripe.PaymentIntent;

      const {
        id,
        amount,
        metadata,
        shipping: { address, name },
      } = paymentIntent;
      console.log(paymentIntent);

      const metadataItems = JSON.parse(metadata.items);

      const orderItems = Object.keys(metadataItems).map((item) => ({
        id: item,
        qty: metadataItems[item].qty,
        total: metadataItems[item].total,
      }));

      const order = {
        piKey: id,
        userId: metadata.userId,
        userEmail: metadata.userEmail,
        amount,
        items: orderItems,
        shipping: {
          address,
          name,
        },
      };

      console.log('order: ', order);
      const newOrder = new this.orderModel(order);
      await newOrder.save();
      console.log('Order saved!');
    }
  }
}
