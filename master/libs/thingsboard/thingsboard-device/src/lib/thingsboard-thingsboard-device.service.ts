import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { extend } from 'leaflet';

@Injectable()
export class ThingsboardThingsboardDeviceService {
    private token : string;
    private baseURL = "http://localhost:8080/api/customer";
    constructor(private httpService: HttpService) {this.token="";}

    setToken(token : string) : void {
      this.token = token;
    }

    async getCustomerDevices(page:number, pageSize:number, customerID:string) {
      if(this.token == "")
        return null;

        const url = this.baseURL+'/'+
        customerID+
        '/deviceInfos?pageSize='+pageSize+
        '&page='+page+
        '&customerId='+customerID;

        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return await lastValueFrom(this.httpService.get(
            url,
            { headers: headersReq }
          ))
    }

    processDevices(devices) : deviceList[] {
      let list:[deviceList];
      devices.forEach((item, list) => {
        list.push({
          deviceID : item['id']['id'],
          isGateway : item['additionalInfo']['gateway'],
          name : item['name'],
          profile : item['id']['entityType']
        })
      });
      return list;
    }

    
}

export class deviceList {
  deviceID : string;
  isGateway : boolean;
  name : string;
  profile : string;
}
