import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core/core.module';
import baseConfig from './config/base.config';
import databaseConfig from './config/database.config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductModule } from './modules/product/product.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, databaseConfig],
    }),
    UserModule,
    ProductModule,
    AuthModule,
    DatabaseModule,
    JwtModule,
    CategoriesModule,
    CoreModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
