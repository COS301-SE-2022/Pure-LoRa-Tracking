import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardDeviceService {
    private token : string;
    private baseURL = "http://localhost:8080/api/customer/";
    constructor(private httpService: HttpService) {this.token="";}

    setToken(token : string) : void {
      this.token = token;
    }

    async getCustomerDevices(page:number, pageSize:number, customerID:string) {
      if(this.token == "")
        return null;

        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return await lastValueFrom(this.httpService.post(
            this.baseURL+
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
        ))
    }
}
