import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService ) {
  }
  @Get()
  auth(@Query('initData') initData: string){
    if(!initData) throw new BadRequestException()
    return {ok: this.authService.verify(initData)}
  }
}
