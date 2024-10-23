import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import * as CryptoJS  from 'crypto-js';

@Injectable()
export class AuthService {
  verify(initData: string): boolean{
    const params = new URLSearchParams(initData)

    let hash = params.get('hash')
    if(!hash) return false
    params.delete('hash')

    const strings: string[] = []
    for (const [k, v] of params.entries()) strings.push(`${k}=${v}`)
    strings.sort()
    const authData = strings.join('\n')
    const skHmac = CryptoJS.HmacSHA256(process.env.BOT_TOKEN, "WebAppData");
    const authHash = CryptoJS.HmacSHA256(authData, skHmac).toString(CryptoJS.enc.Hex)

    return hash === authHash
  }
}
