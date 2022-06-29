import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareSessionManagementService implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log('session manage');
        next();
    }
}
