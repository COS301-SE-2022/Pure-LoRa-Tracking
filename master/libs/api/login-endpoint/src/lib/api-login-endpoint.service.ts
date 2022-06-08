import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { userLoginData } from '../api-login.interface';

@Injectable()
export class ApiLoginEndpointService {
    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }
    async doLogin(body: userLoginData) {
        if (body.username == undefined || body.password == undefined) {
            return {
                status: 400,
                explain: 'Username and password required.'
            }
        }
        const loginResponse = await this.thingsboardClient.loginUserReturnToken(body.username, body.password);
        if (loginResponse.Token != "" && loginResponse.refreshToken != "") {
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
