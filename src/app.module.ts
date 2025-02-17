import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthCheckMiddleware } from './middlewares/authCheck.middleware';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationService } from './organization/organization.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER_NAME || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'test',
      entities: [],
      synchronize: true,
    }),
    DatabaseModule,
    ProductModule,
    UserModule,
    OrderModule,
    OrganizationModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController, OrderController, OrderController],
  providers: [AppService, AuthService, OrderService, OrganizationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')

    consumer
      .apply(AuthCheckMiddleware)
      .exclude('auth')
      .forRoutes('*')
  }
}
