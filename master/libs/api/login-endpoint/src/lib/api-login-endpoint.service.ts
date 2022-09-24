import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { refreshTokenLogin, userLoginData, userLoginResponse } from '../api-login.interface';
import { execFile } from 'child_process';

@Injectable()
export class ApiLoginEndpointService {
    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }

    async doLogin(body: userLoginData): Promise<userLoginResponse> {
        if (body.username == undefined || body.password == undefined) {
            return {
                status: 400,
                explain: 'username and password required.'
            }
        }
        const loginResponse = await this.thingsboardClient.loginUserReturnToken(body.username, body.password)

        if (loginResponse.Token != "" && loginResponse.refreshToken != "") {
            this.thingsboardClient.setToken(loginResponse.Token)
            const userInfo = await this.thingsboardClient.getUserInfoFromToken();
            return {
                status: 200,
                explain: 'Login successful.',
                token: loginResponse.Token,
                refreshToken: loginResponse.refreshToken,
                //userID : userInfo.data.id.id,
                reserveID : userInfo.data.customerId.id,
                reserves : userInfo.data.additionalInfo.reserves
            }
        }
        return {
            status: 401,
            explain: 'Login unsuccessful.'
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
