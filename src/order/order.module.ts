import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers:[OrderController],
  providers: [...orderProviders, OrderService],
  exports:[...orderProviders, OrderService]
})
export class OrderModule {}
