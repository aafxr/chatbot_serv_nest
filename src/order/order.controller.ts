import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { AppResponse } from '../classes/AppResponse';
import { IRequest } from '../@types/IRequest';

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService
  ) {}


  /**
   * апи позволяет добавить заказ
   * @param order
   */
  @Post('new')
  async create(@Body('order') order: Order){
    try {
      const o = new Order(order)
      const res = await this.orderService.create(o)
      if (res) return new AppResponse(true, res)
      return new AppResponse(false, undefined, 'something wrong while try to add order')
    }catch (e){
      return new AppResponse(false, undefined, 'something wrong while try to add order\n' + e.message)
    }
  }


  /**
   * апи позволяет получить список заказов пользователя по ид пользователя
   * @param req
   */
  @Get('all')
  async getAll(@Req() req: IRequest){
    try {
      const ol = await this.orderService.getByUserId(req.userId)
      return new AppResponse(true, ol)
    }catch (e) {
      return new AppResponse(false, undefined, 'not found\n' + e.message)
    }
  }


  /**
   * апи позволяет удалить пользователя путем установки поля deleteAt
   * @param order
   */
  @Post('rm')
  async deleteOrder(@Body('order') order: Order){
    try {
      const o = new Order(order)
      const res = await this.orderService.delete(o)
      if(res) return new AppResponse(true, res)
      return new AppResponse(false, undefined, 'something wrong while try to delete order')
    } catch (e) {
      return new AppResponse(false, undefined, 'something wrong while try to delete order\n' + e.message)
    }
  }


  /**
   * апи возвращаетзаказ по ид
   * @param id
   * @param req
   */
  @Get(':orderId')
  async getById(@Param('orderId') id: string, @Req() req: IRequest){
    try {
      const o = await this.orderService.getById(+id)
      if(o.userId !== req.userId || !req.isAdmin || !req.isManager) return new AppResponse(false, undefined, "permission denied")
      if (o) return new AppResponse(true, o)
      return new AppResponse(false, undefined, 'not found')
    } catch (e){
      return new AppResponse(false, undefined, 'not found\n' + e.message)
    }
  }
}
