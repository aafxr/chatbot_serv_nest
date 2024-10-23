import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productProviders,
    ProductService
  ],
  controllers: [ProductController]
})
export class ProductModule {}
