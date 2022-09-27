import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Input2Fa, refreshTokenLogin, userInitLoginResponse, userLoginData, userLoginResponse,check2FAInput } from '../api-login.interface';
import { execFile } from 'child_process';

@Injectable()
export class ApiLoginEndpointService {
    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }

    async doLogin(body: userLoginData): Promise<userInitLoginResponse> {
        if (body.username == undefined || body.password == undefined) {
            return {
                status: 400,
                explain: 'username and password required.'
            }
        }
        const loginResponse = await this.thingsboardClient.loginUserReturnToken(body.username, body.password)
        //check if user has 2fa setup
        console.log("teste",loginResponse);
        if(loginResponse.refreshToken==null&&loginResponse.status=="ok"){
            return{
                status:200,
                explain:"Login successful. 2fa",
                token:loginResponse.Token,
                enabled2fa:true
            }
        }
        else if(loginResponse.refreshToken!=null&&loginResponse.status=="ok"){
            //check if 2fa is enabled
            const enabled=await this.thingsboardClient.check2FAEnabled(loginResponse.Token);
            if(enabled){
                //get 2fa secret
                const secret=await this.thingsboardClient.generate2FA(loginResponse.Token);
                return{
                    status:200,
                    explain:"Login failed. No 2fa",
                    token:loginResponse.Token,
                    authURL:secret.data.authUrl,
                    enabled2fa:true
                }
            }
            else {
                return{
                    status:200,
                    explain:"Login successful. 2fa not enabled",
                    token:loginResponse.Token,
                    refreshToken:loginResponse.refreshToken,
                    enabled2fa:false
                }
            }
        }

       return {
            status:401,
            explain:loginResponse.explanation,
       }
    }

    async do2faAuth(content : Input2Fa) : Promise<userLoginResponse> {
        // console.log("I GOT",content);
        const resp=await this.thingsboardClient.verify2FA(content.token,content.authcode,content.authurl);
        if(resp.status=="fail"){
            if(resp.explanation=="Verification code is incorrect")

            return {
                status:500,
                explain:resp.explanation
            }
        }
        else if(resp.status=="ok"){
            return {
                status:200,
                explain:resp.explanation
            }
        }

    }

    async do2faCheck(content:check2FAInput):Promise<userLoginResponse>{
        const resp=await this.thingsboardClient.check2FA(content.token,content.authcode);
        if(resp.status=="fail"){
            return {
                status:500,
                explain:resp.explanation
            }
        }
        else if(resp.status=="ok"){
            return {
                status:200,
                explain:resp.explanation,
                token:resp.data.token,
                refreshToken:resp.data.refreshToken
            }
        }
    }

    async doRefreshTokenLogin(body:refreshTokenLogin):Promise<userLoginResponse>{
        if(body.refreshToken==undefined){
            return {
                status: 400,
                explain: 'No token provided'
            }
        }
        const resp=await this.thingsboardClient.loginFromRefreshToken(body.refreshToken);
        if(resp.status=="fail"){
            return {
                status:500,
                explain:resp.explanation
            }
        }
        else if(resp.status=="ok"){
            this.thingsboardClient.setToken(resp.data.token)
            return {
                status: 200,
                explain: 'Login successful.',
                token: resp.data.token,
                refreshToken: resp.data.refreshToken
            }
        }

        return {
            status:500,
            explain:"Something went wrong"
        }
        
    }

    async processLogout(content : {token : string}) : Promise<userLoginResponse> {
        const logout = await this.thingsboardClient.logout(content.token);
        if(logout.status != "ok")
            return {
                status : 500,
                explain : logout.explanation
            }
        return {
            status : 200,
            explain : "logout successful"
        }
    }

    async resetLogin(content:{email:string}) : Promise<userLoginResponse> {
        if(content.email == "" || content.email == undefined)
        return {
            status : 403,
            explain : "no email provided"
        }

        this.thingsboardClient.resetLogin(content.email);

        return {
            status : 200,
            explain : 'reset attempt'
        }
    }
}
