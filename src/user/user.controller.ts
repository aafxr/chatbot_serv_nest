import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AppResponse } from '../classes/AppResponse';

/**
 * api для работы с сущностью пользователя (User)
 */
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}


  /**
   * добавление пользователя
   *
   * ожидает в теле запроса
   *
   * ```
   * {
   *    user: {}
   * }
   * ```
   *
   * @param user
   */
  @Post('new')
  async new(@Body('user') user: User){
    const u = new User(user)
    if (u.id === -1) throw new BadRequestException()
    try {
      await this.userService.create(u)
      return new AppResponse(true, u)
    }catch (e){
      return new AppResponse(false, undefined, "ошибка при создании пользователя\n" + e.message)
    }
  }



  /**
   * обновление пользователя
   *
   * ожидает в теле запроса
   *
   * ```
   * {
   *    user: {}
   * }
   * ```
   *
   * @param user
   */
  @Post('update')
  async update(@Body('user') user: User){
    const u = new User(user)
    if (u.id === -1) throw new BadRequestException()
    try {
      await this.userService.update(u)
      return new AppResponse(true, u)
    }catch (e){
      return new AppResponse(false, undefined, "ошибка при обновлении пользователя\n" + e.message)
    }
  }


  /**
   * в процессе ...
   */
  @Get('me')
  async getCurrentUser(){

  }
}
