import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * сервис позволяет
 * - создавать
 * - обнавлять
 *
 * пользователя в бд
 */
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  /**
   * создать нового пользователя в бд
   * @param u
   */
  async create(u: User){
    return this.userRepository.save(u)
  }


  /**
   * поиск пользователя по ид
   * @param id
   */
  async getById(id: User['id']): Promise<User | undefined>{
    const res = await this.userRepository.findOneBy({id})
    if(res) return new User(res)
  }


  /**
   * обновление данных пользователя
   * @param u
   */
  async update(u){
    return this.userRepository.save(u)
  }
}
