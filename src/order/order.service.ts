import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>
  ) {}

  /**
   * метод позволяет создать заказ
   * @param o
   */
  async create(o: Order): Promise<Order>{
    return this.orderRepository.save(o)
  }


  /**
   * метод позволяет получить заказ по ид
   * @param id
   */
  async getById(id: Order['id']): Promise<Order>{
    return await this.orderRepository.findOneBy({id})
  }


  /**
   * метод позволяет получить заказы по ид пользователя
   * @param id
   */
  async getByUserId (id: User['id']):Promise<Order[]>{
    return this.orderRepository.find({where: {userId: id, deletedAt: IsNull()}})
  }


  /**
   * метод позволяет удалить заказ путем установки поля deletedAt
   * @param o
   */
  async delete(o: Order): Promise<Order>{
    o.deletedAt = new Date()
    return this.orderRepository.save(o)
  }
}
