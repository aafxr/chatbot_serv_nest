import { BadRequestException, Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppResponse } from '../classes/AppResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}


  /**
   * api на основе полученных от тг данных генерирует токен доступа
   * @param initData
   */
  @Get()
  auth(@Query('initData') initData: string){
    if(!initData) throw new BadRequestException()

    if(this.authService.verify(initData)){
      const token = this.authService.getToken(initData)
      return new AppResponse(true, {token})
    }
    throw new UnauthorizedException()
  }
}
