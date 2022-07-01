import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareHttpLoggerService implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        if(process.env.debug == "true")
            console.log(req.body);
        next();
    }
}
