import { Injectable, NestMiddleware } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from "@lora/thingsboard-client";
import { ServerResponse } from 'http';

@Injectable()
export class MiddlewareSessionManagementService implements NestMiddleware {
    constructor(private TBClient : ThingsboardThingsboardClientService) {}
    use(req: Request, res: ServerResponse, next: (error?: any) => void) {
        if(req.body['token'] == undefined)
           return res.end()
        else{
            res.addTrailers({"test":"test"});
            next();}
    }
}
