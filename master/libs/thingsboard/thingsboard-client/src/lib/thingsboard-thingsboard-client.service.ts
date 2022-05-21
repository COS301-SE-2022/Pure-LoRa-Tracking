import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardClientService {
    constructor(private userService : ThingsboardThingsboardUserService,
        private telemetryService : ThingsboardThingsboardTelemetryService
        ) {}

    /*adminSendTelemetry(deviceID:string, username : string, password : string, deviceType :string, payload) {
            this.userService.login(username, password).subscribe((resp: AxiosResponse['data'])=> {
            this.telemetryService.setToken(resp['token']);
            this.telemetryService.sendTelemetry(deviceID, deviceType, payload['latitude'], payload['longitude']).subscribe(()=> {
                //console.log(resp.status);
            })
        })
    }*/
}
