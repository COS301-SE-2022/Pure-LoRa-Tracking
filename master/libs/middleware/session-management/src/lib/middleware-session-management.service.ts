import { Injectable, NestMiddleware } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from "@lora/thingsboard-client";
import { Server, ServerResponse } from 'http';
import * as jwt from "jsonwebtoken"
@Injectable()
export class MiddlewareSessionManagementService implements NestMiddleware {
    constructor(public TBClient: ThingsboardThingsboardClientService) { }
    async use(req: Request, res: ServerResponse, next: (error?: any) => void) {
        //console.log(req.url)
        //login has a pass through this middleware, cause it has more checks later
        if (req.url.startsWith("/login")||req.url.startsWith("/logout")||req.url.startsWith("/reset")) {
            //check if this has a issue with security
            //this MUST be a return
            return next();
        }


        //check for no header
        if(req.headers==undefined)
        return this.failedrequest(res,"No headers provided",400);
        //check for no cookie at all
        if(req.headers["cookie"]==undefined)
        return this.failedrequest(res,"Token cookie or refresh token cookie not provided",400);
        //get the cookies
        const tokenCookieName="PURELORA_TOKEN";
        const refreshtokenCookieName="PURELORA_REFRESHTOKEN";
        const cookies=req.headers["cookie"].split(";");
        let cookietoken=cookies.find(val=>val.trimStart().trimEnd().startsWith(tokenCookieName))
        let cookierefreshtoken=cookies.find(val=>val.trimStart().trimEnd().startsWith(refreshtokenCookieName))
        
        //check for valid cookies
        if(cookietoken==undefined)
            return this.failedrequest(res,"Token cookie not found",400);
        if(cookierefreshtoken==undefined)
            return this.failedrequest(res,"Refresh Token cookie not found",400);

            
        cookietoken=cookietoken.trimStart().trimEnd()
        cookierefreshtoken=cookierefreshtoken.trimStart().trimEnd();
        
        //get the actual values of the tokens
        cookietoken=cookietoken.substring(tokenCookieName.length+1);//+1 is for the =
        cookierefreshtoken=cookierefreshtoken.substring(refreshtokenCookieName.length+1);//+1 is for the =

        //second check for valid values
        if(cookietoken==undefined||cookietoken==null||cookietoken=="")
            return this.failedrequest(res,"Token cookie not found",400);
        if(cookierefreshtoken==undefined||cookierefreshtoken==null||cookierefreshtoken=="")
            return this.failedrequest(res,"Refresh Token cookie not found",400);

        
        //check if the token is valid
        jwt.verify(cookietoken,Buffer.from(process.env.THINGSBOARD_SECRET,"base64"),async (err,decoded)=>{
            if(err){
                if(err.message=="jwt malformed"){
                    this.failedrequest(res,"Token cookie is malformed",400);
                }
                else if(err.message=="invalid signature"){
                    this.failedrequest(res,"Token cookie is invalid",400);
                }
                else if(err.message=="jwt expired"){
                    //try to refresh
                    const refreshresp=await this.TBClient.refresh(cookierefreshtoken);
                    // //console.log(cookierefreshtoken)
                    //theoretically should never run unless status is changed to string
                    if(refreshresp.status!="fail"&&refreshresp.status!="ok")
                        return this.failedrequest(res,"Something went wrong",500);
                        
                    else if(refreshresp.status=="fail")
                        return this.failedrequest(res,"Could not refresh Token Or Token Invalid",401);
                    else if(refreshresp.status=="ok"){
                        //reset the tokens and set headers
                        // //console.log("asdf");
                        req.body["token"]=refreshresp.token;
                        req.body["refreshToken"]=refreshresp.refreshToken;
                        res.setHeader("Set-Cookie",[`${refreshtokenCookieName}=${refreshresp.refreshToken}; Max-Age=1209600; Path=/;`,`${tokenCookieName}=${refreshresp.token}; Max-Age=1209600; Path=/;`]);
                    }
                    return next();
                }
                else{
                    //unknown error
                    return this.failedrequest(res,"Something went wrong",500);
                }
            }
            else{
                if(!decoded?.scopes?.includes("TENANT_ADMIN")&&req.url.includes("admin")){
                    return this.failedrequest(res,"You are not an admin",401);
                }
                req.body["token"]=cookietoken;
                req.body["refreshToken"]=cookierefreshtoken;
                return next();
            }
        });
        
        // NB
        // nothing should happen after this function, it returns headers to user
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
