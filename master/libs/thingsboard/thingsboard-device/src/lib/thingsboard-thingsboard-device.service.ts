import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardDeviceService {
    private token : string;
    constructor(token : string, private httpService: HttpService) {this.token = token}

    getCustomerDevices(page:number, pageSize:number, customerID:string) {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return this.httpService.post(
            'http://localhost:8080/api/customer/'+
            +customerID+'/deviceInfos?'+
            'pageSize='+pageSize+'&'+
            'page='+page+'&'+
            'customerId='+customerID+'',
            {},
            { headers: headersReq }
          ).pipe(
            map(
              Response => Response.data
            )
        )
    }
}
