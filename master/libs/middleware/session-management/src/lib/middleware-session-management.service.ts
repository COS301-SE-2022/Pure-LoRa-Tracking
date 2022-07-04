import { Injectable, NestMiddleware } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from "@lora/thingsboard-client";
import { Server, ServerResponse } from 'http';

@Injectable()
export class MiddlewareSessionManagementService implements NestMiddleware {
    constructor(private TBClient: ThingsboardThingsboardClientService) { }
    async use(req: Request, res: ServerResponse, next: (error?: any) => void) {
        
        //console.log(req.url)
        //login has a pass through this middleware, cause it has more checks later
        if (req.url.startsWith("/login")) {
            //check if this has a issue with security
            //this MUST be a return
            return next();
        }
        
        
        //check for no cookie at all
        if(req.headers["cookie"]==undefined)
        return this.failedrequest(res,"Token cookie or refresh token cookie not provided",400);
        //console.log(req.headers["cookie"])
        //get the cookies
        const tokenCookieName="PURELORA_TOKEN";
        const refreshtokenCookieName="PURELORA_REFRESHTOKEN";
        const cookies=req.headers["cookie"].split(";");
        let cookietoken=cookies.find(val=>val.trimStart().trimEnd().startsWith(tokenCookieName)).trimStart().trimEnd()
        let cookierefreshtoken=cookies.find(val=>val.trimStart().trimEnd().startsWith(refreshtokenCookieName)).trimStart().trimEnd()
        
        //check for valid cookies
        if(cookietoken==undefined)
            return this.failedrequest(res,"Token cookie not found",400);
        if(cookierefreshtoken==undefined)
            return this.failedrequest(res,"Refresh Token cookie not found",400);

        //get the actual values of the tokens
        cookietoken=cookietoken.substring(tokenCookieName.length+1);
        cookierefreshtoken=cookierefreshtoken.substring(refreshtokenCookieName.length+1);

        //second check for valid values
        if(cookietoken==undefined||cookietoken==null||cookietoken=="")
            return this.failedrequest(res,"Token cookie not found",400);
        if(cookierefreshtoken==undefined||cookierefreshtoken==null||cookietoken=="")
            return this.failedrequest(res,"Refresh Token cookie not found",400);

        const valid=await this.TBClient.validateTokenParam(cookietoken);
        //console.log(cookietoken)
        //maybe change to only refresh if token is expired

        if(!valid){
            //try to refresh
            const refreshresp=await this.TBClient.refresh(cookierefreshtoken);
            // //console.log(cookierefreshtoken)
            //theoretically should never run unless status is changed to string
            if(refreshresp.status!="fail"&&refreshresp.status!="ok")
                return this.failedrequest(res,"Something went wrong",500);
                
            if(refreshresp.status=="fail")
                return this.failedrequest(res,"Could not refresh Token Or Token Invalid",401);

            if(refreshresp.status=="ok"){
                //reset the tokens and set headers
                // //console.log("asdf");
                req.body["token"]=refreshresp.token;
                res.setHeader("Set-Cookie",[`${refreshtokenCookieName}=${refreshresp.refreshToken}; Max-Age=1209600; Path=/;`,`${tokenCookieName}=${refreshresp.token}; Max-Age=1209600; Path=/;`]);
            }
        }
        else{
            req.body["token"]=cookietoken;
        }
        
        //carry on with the request
        next();
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
