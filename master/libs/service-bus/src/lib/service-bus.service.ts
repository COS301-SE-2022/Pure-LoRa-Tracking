import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ServiceBusService {
    constructor(private httpService: HttpService) { }

    async sendMongoDevicePerimeter(data: { device?: any, location?: any, name?: string, newName?:string, action:string}) {
        //console.log('send device perimeter')
        const resp = await firstValueFrom(
            this.httpService.post('http://localhost:3334/api/ai/perimeter', {
                data
            })
        ).catch((error) => {
            if (error.response == undefined) return error.code;
            return error;
        });

        console.log(resp)

        if (resp == 'ECONNREFUSED')
            return {
                status: 500,
                explanation: resp,
            };
        else if (resp.status != 200) {
            return {
                status: resp.status,
                explanation: resp.explanation,
            };
        }
    }
}
