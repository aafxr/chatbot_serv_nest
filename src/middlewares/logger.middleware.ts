import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'node:fs';


/**
 * мидлвер, логирует обращения и результаты обработки запросов в файл _log.log
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const log = `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}\n`
      fs.appendFile('_log.log', log, err => err ? console.error(err) : console.log(log))
    })
    next();
  }
}
