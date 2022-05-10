import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import { AxiosResponse } from 'axios';
@Injectable()
export class ThingsboardThingsboardClientService {
    constructor(private userService : ThingsboardThingsboardUserService,
        private telemetryService : ThingsboardThingsboardTelemetryService
        ) {}

    /*sendTelemetry(username : string, password : string, deviceName : string, custName:string, custPass:string, payload) : void {
        this.userService.login(custName, custPass).subscribe((resp)=> {
            this.userService
        })
    }*/

    adminSendTelemetry(deviceID:string, username : string, password : string, deviceType :string, payload) : void {
        this.userService.login(username, password).subscribe((resp: AxiosResponse['data'])=> {
            this.telemetryService.setToken(resp['token']);
            this.telemetryService.sendTelemetry(deviceID, deviceType, payload['latitude'], payload['longitude']);
        })
    }
}
