import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { AppResponse } from '../classes/AppResponse';
import { Product } from '../entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}


  @Get()
  async create(){
    const p = new Product()
    p.id = '99999'
    p.apiCode = 'test prod'
    p.apiUID = '999999'
    try {
      const res = await this.productService.create(p)
      if(res) return new AppResponse(true, res)
      return new AppResponse(false, undefined, 'creating new product fail')
    }catch (e){
      return new AppResponse(false, p, 'something wrong while create product\n' + e.message)
    }
  }


  @Get('all')
  async getAll(){
    try {
      const products = await this.productService.all()
      return new AppResponse(true, products)
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while find products\n' + e.message)
    }
  }


  @Get(':id')
  async byId(@Param('id') id: string){
    try {
      if(!id) return new AppResponse(false, undefined, 'empty id')

      const product = await this.productService.byId(id)
      if(product) return new AppResponse(true, product)

      return new AppResponse(false, undefined, "product not found")
    } catch (e){
      return new AppResponse(false, undefined, 'something wrong while find product\n' + e.message)
    }
  }



}
