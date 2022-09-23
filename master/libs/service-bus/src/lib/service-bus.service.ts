import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DatabaseProxyService } from '@lora/database';

@Injectable()
export class ServiceBusService {
    constructor(private httpService: HttpService,private proxy:DatabaseProxyService) { }

    async getMoreInfo(deveui:string){
        return this.proxy.getMoreInfo(deveui);
    }

    async sendMongoDevicePerimeter(data: { device?: any, location?: any, name?: string, newName?:string}) {
        const resp = await firstValueFrom(
            this.httpService.post('http://localhost:4444/api/ai/perimeter', {
                data
            })
        ).catch((error) => {
            if (error.response == undefined) return error.code;
            return error;
        });

        if (resp == 'ECONNREFUSED')
            return {
                status: 500,
                explanation: resp,
            };
        else if (resp.status != 200) {
            return {
                status: resp.response.status,
                explanation: resp.response.data.message,
            };
        }
    }
}
