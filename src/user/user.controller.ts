import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AppResponse } from '../classes/AppResponse';
import { IRequest } from '../@types/IRequest';
import { TelegramUserType } from '../@types/TelegramUserType';

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
  async new(@Body('user') user: TelegramUserType){
    const u = new User(user)
    if(user.photo) u.photo = user.photo

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
   * возвращает данные текущего пользователя
   */
  @Get('me')
  async getCurrentUser(@Req() req: IRequest){
    const id = req.userId
    if(!id) throw new UnauthorizedException()
    console.log(id);

    try {
      const user = await this.userService.getById(id)
      if(user) return new AppResponse(true, user)
      return new AppResponse(false, undefined, 'пользователь не найден')
    } catch (e) {
      throw new InternalServerErrorException(e.message)
    }
  }
}
