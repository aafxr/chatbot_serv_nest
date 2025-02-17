import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * проверка данных на валидность
   * @param initData
   */
  verify(initData: string): boolean {
    const params = new URLSearchParams(initData);

    let hash = params.get('hash');
    if (!hash) return false;
    params.delete('hash');

    const strings: string[] = [];
    for (const [k, v] of params.entries()) strings.push(`${k}=${v}`);
    strings.sort();
    const authData = strings.join('\n');
    const skHmac = CryptoJS.HmacSHA256(process.env.BOT_TOKEN, 'WebAppData');
    const authHash = CryptoJS.HmacSHA256(authData, skHmac).toString(
      CryptoJS.enc.Hex,
    );

    return hash === authHash;
  }


  /**
   * генерация токена на основе полученных данных от тг
   * @param initData
   */
  async getToken(initData: string) {
    const userJSON = new URLSearchParams(initData).get('user');
    const user = JSON.parse(userJSON);
    let appUser = await this.userService.getById(+user.id)
    if(!appUser) appUser = await this.userService.create(user)
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 3600,
        userId: user.id,
        role: appUser?.role || 'customer'
      },
      process.env.SECRET_KEY,
    );
  }
}

