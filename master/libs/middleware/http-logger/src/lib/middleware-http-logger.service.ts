import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareHttpLoggerService implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        //console.log(req);
        next();
    }
}
