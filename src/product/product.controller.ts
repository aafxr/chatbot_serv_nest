import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { AppResponse } from '../classes/AppResponse';
import { Product } from '../entities';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}


  @Get('all')
  async getAll(){
    try {
      const products = await this.productService.all()
      return new AppResponse(true, products)
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while find products\n' + e.message)
    }
  }


  @Get('products')
  async products(){
    try {
      const products = await this.productService.getProducts()
      return new AppResponse(true, products)
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while find products\n' + e.message)
    }
  }


  @Get('sections')
  async sections(){
    try {
      const sections = await this.productService.getSections()
      return new AppResponse(true, sections)
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while find sections\n' + e.message)
    }
  }


  @Get('articles')
  async articles(){
    try {
      const articles = await this.productService.getArticles()
      return new AppResponse(true, articles)
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while find articles\n' + e.message)
    }
  }


  @Get('product/:id/details')
  async getDetails(@Param('id') id: string){
    try {
      if(!id) return new AppResponse(false, undefined, 'empty id')
      const details = await this.productService.getDetails(id)
      if(details) return new AppResponse(true, details)
      return new AppResponse(false, undefined, "details not found")
    } catch (e){
      return new AppResponse(false, undefined, 'something wrong while find product details\n' + e.message)
    }
  }


  @Get('product/:id')
  async byId(@Param('id') id: string){
    try {
      if(!id) return new AppResponse(false, undefined, 'empty id')

      const product = await this.productService.getProductById(id)
      if(product) return new AppResponse(true, product)
      return new AppResponse(false, undefined, "product not found")
    } catch (e){
      return new AppResponse(false, undefined, 'something wrong while find product\n' + e.message)
    }
  }
}
