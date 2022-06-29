import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { userLoginData, userLoginResponse } from '../api-login.interface';
import { execFile } from 'child_process';

@Injectable()
export class ApiLoginEndpointService {
    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }

    async doLogin(body: userLoginData): Promise<userLoginResponse> {
        if (body.username == undefined || body.password == undefined) {
            return {
                status: 400,
                explain: 'Username and password required.'
            }
        }
        const loginResponse = await this.thingsboardClient.loginUserReturnToken(body.username, body.password)
            .catch(() => {
                return {
                    Token: "",
                    refreshToken: "",
                }
            });
        if (loginResponse.Token != "" && loginResponse.refreshToken != "") {
            this.thingsboardClient.setToken(loginResponse.Token)
            console.log("test")
            return {
                status: 200,
                explain: 'Login successful.',
                token: loginResponse.Token,
                refreshToken: loginResponse.refreshToken
            }
        }
        return {
            status: 401,
            explain: 'Login unsuccessful.'
        }
    }
}
