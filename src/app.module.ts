import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { CoreModule } from "./modules/core/core.module";
import baseConfig from "./config/base.config";
import databaseConfig from "./config/database.config";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { CategoriesModule } from "./modules/categories/categories.module";
import { DatabaseModule } from "./modules/database/database.module";
import { ProductModule } from "./modules/product/product.module";
import { UserController } from "./modules/user/user.controller";
import { UserModule } from "./modules/user/user.module";
import { UserService } from "./modules/user/user.service";
import { PaymentsModule } from "./modules/payments/payments.module";
import { OrdersModule } from "./modules/orders/orders.module";
import stripeConfig from "./config/stripe.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, databaseConfig, stripeConfig],
      isGlobal: true,
      cache: true
    }),
    UserModule,
    ProductModule,
    AuthModule,
    DatabaseModule,
    JwtModule.register({ global: true }),
    CategoriesModule,
    CoreModule,
    PaymentsModule,
    OrdersModule
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService]
})
export class AppModule {}
