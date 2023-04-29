import { Body, Controller, Post, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentIntentDto } from './DTOs/payment-intent-dto';
import { calculateOrderAmount } from './utils/calculateOrderAmount';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/schemas/product.schema';
import { StripeWebhookDto } from './DTOs/stripe-webhook.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private paymentsService: PaymentsService,
  ) {}

  @Post('create-intent')
  async createPaymentIntent(@Body() paymentIntentDto: PaymentIntentDto) {
    const { items, user } = paymentIntentDto;

    const total = await calculateOrderAmount(items, this.productModel);
    const stringyfiedItems = JSON.stringify(items);

    const { client_secret, amount } = await this.paymentsService.createPaymentIntent({
      items: stringyfiedItems,
      user,
      total,
    });

    return { clientSecret: client_secret, total: amount };
  }

  @Post('/webhook')
  async handleWebhook(
    @Body() stripeWebhookDto: StripeWebhookDto,
    @Headers('stripe-signature') stripeSignature: string,
  ): Promise<void> {
    await this.paymentsService.handleWebhook(stripeWebhookDto.event, stripeSignature);
  }
}
