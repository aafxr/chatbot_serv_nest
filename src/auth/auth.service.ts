import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { createHmac } from'node:crypto';

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
    const skHmac = createHmac('sha256', 'WebAppData')
      .update(process.env.BOT_TOKEN)
      .digest('hex')
    const authHash = createHmac('sha256',skHmac)
      .update(authData)
      .digest('hex')

    return hash === authHash
  }
}
