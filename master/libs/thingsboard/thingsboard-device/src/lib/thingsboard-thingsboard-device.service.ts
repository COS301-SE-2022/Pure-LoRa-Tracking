import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

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
      const list : deviceList[] = new Array<deviceList>();
      for (let i = 0; i < devices.length; i++) {
        list.push({
          deviceID : devices[i]['id']['id'],
          isGateway : devices[i]['additionalInfo']['gateway'],
          name : devices[i]['name'],
          profile : devices[i]['id']['entityType']
        }) 
      }
      return list;
    }

    async createDevice(hardwareID: string, labelName: string, isGateway: boolean) : Promise<boolean> {
      return false;
    }

    async assignDevicetoCustomer(custID : string, deviceID: string) : Promise<boolean> {
      return false;
    }

    async getDeviceProfiles() {
      return null;
    }

    processDeviceProfiles(profiles:any) : profileList[] {
      return null;
    }

    async deleteDevice() : Promise<boolean> {
      return false;
    }

    async removeDeviceFromCustomer(custID:string, deviceID:string) : Promise<boolean> {
      return false;
    }
}

export class deviceList {
  deviceID : string;
  isGateway : boolean;
  name : string;
  profile : string;
}

export class profileList {
  profileID : string;
  profileName : string
}
