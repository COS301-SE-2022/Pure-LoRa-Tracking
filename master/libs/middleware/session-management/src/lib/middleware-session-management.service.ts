import { Injectable, NestMiddleware } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from "@lora/thingsboard-client";
import { Server, ServerResponse } from 'http';

@Injectable()
export class MiddlewareSessionManagementService implements NestMiddleware {
    constructor(private TBClient: ThingsboardThingsboardClientService) { }
    async use(req: Request, res: ServerResponse, next: (error?: any) => void) {
        
        console.log(req.headers["cookie"]);
        console.log(await this.TBClient.validateTokenParam(req.body["token"]))
        //try to refresh
        //new token
        





        next();
        // console.log(req.headers["cookie"]);
        // //check if its login
        // if (req.url.startsWith("url/login")) {

        // }
        // else {
        //     if (req.body['token'] == undefined || req.body['refreshToken'] == undefined) {
        //         return this.failedrequest(res,"Token or refresh token not provided",400)
        //     }
        //     else {
        //         // res.addTrailers({"test":"test"});
        //         console.log(await this.TBClient.validateTokenParam(req.body["token"]))
        //         console.log("original request " + req.body['token']);
        //         req.body["token"] = "test";
        //         next();
        //     }
        // }
    }

    failedrequest(res:ServerResponse,msg:string,code:number):ServerResponse{
        res.setHeader("Content-Type","application/json")
        res.statusCode=code;
        const temp={
            "status":code,
            "reason":msg
        }
        res.end(Buffer.from(JSON.stringify(temp)))
        return res;
    }
}
