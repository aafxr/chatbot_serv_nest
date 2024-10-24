import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import * as process from 'node:process';
import { TokenPayloadType } from '../@types/TokenPayloadType';

@Injectable()
export class AuthCheckMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization
    if(!auth) throw new UnauthorizedException()

    const token = auth.split(' ')[1]
    if(!token) throw new UnauthorizedException()

    const payload = await new Promise<TokenPayloadType>((res, rej) => {
      jwt.verify(token, process.env.SECRET_KEY, (e, d) => {
        if(e)  rej(e)
        else res(d as TokenPayloadType)
      })
    })


    next();
  }
}