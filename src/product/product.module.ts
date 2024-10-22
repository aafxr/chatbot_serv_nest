import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productProviders,
    ProductService
  ]
})
export class ProductModule {}
