import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-execution-time');
    res.on('finish', () => console.timeEnd('Request-execution-time'));
    next();
  }
}
