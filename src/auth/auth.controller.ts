import { BadRequestException, Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppResponse } from '../classes/AppResponse';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}


  /**
   * api на основе полученных от тг данных генерирует токен доступа
   * @param initData
   */
  @Get()
  async auth(@Query('initData') initData: string){
    if(!initData) throw new BadRequestException()

    if(this.authService.verify(initData)){
      const token = await this.authService.getToken(initData)
      return new AppResponse(true, {token} )
    }
    throw new UnauthorizedException()
  }
}
