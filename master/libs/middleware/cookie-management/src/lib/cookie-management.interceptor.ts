import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { map, Observable } from 'rxjs';

@Injectable()
export class CookieManagementInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Intercepted request"+context.switchToHttp().getRequest());
    const temp=next.handle(); 
    const ResponseObj:ExpressResponse = context.switchToHttp().getResponse();
    // ResponseObj.setHeader('x-access-token', 'Your Data' );
    return temp;
  }
}
