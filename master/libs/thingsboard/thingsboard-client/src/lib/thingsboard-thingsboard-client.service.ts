import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardDeviceService } from '@lora/thingsboard-device';
@Injectable()
export class ThingsboardThingsboardClientService {

    private token : string;
    private refreshToken : string;
    private customerID : string;
    private userType : string;

    constructor(private userService : ThingsboardThingsboardUserService,
        private telemetryService : ThingsboardThingsboardTelemetryService,
        private loginService : ThingsboardThingsboardUserService,
        private deviceService : ThingsboardThingsboardDeviceService
        ) {}

    async loginUser(username : string, password : string) : Promise<boolean> {
        const resp = await this.loginService.login(username, password);
        if(resp['data']['token'] != undefined) {
            this.token = resp['data']['token'];
            this.refreshToken = resp['data']['RefreshToken'];
            return true;
        }
        return false;
    }

    async getUserDevices() : Promise<any> {
        const InfoResp = await this.loginService.userInfo(this.token);
        this.deviceService.setToken(this.token);
        const DeviceResp = await this.deviceService.getCustomerDevices(0, 5, InfoResp['data']['customerId']['id']);
        return DeviceResp;
    }

    /*async getDeviceTelemetry(DeviceID: string) : Promise<any> {
        
    }*/

    /*
        check token
        check customerID
        get asset list
        get, build and return perim
    */
    /*async getReservePerimeterForReserveUser() {
        if(this.token == undefined)
            return {
                code : 401,
                status : "failure",
                explanation : "no access token"
            }
        if(this.userType != 'reserveUser')
        return {
            code : 401,
            status : "failure",
            explanation : "no access token"
        }
    }*/
}
