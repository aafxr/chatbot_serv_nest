import { Get, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>
  ) {}

  async create(p: Product){
    return this.productRepository.save(p)
  }

  async byId(id: Product['id']){
    return this.productRepository.findOneBy({id})
  }

  async all(): Promise<Product[]>{
    return this.productRepository.find()
  }
}
