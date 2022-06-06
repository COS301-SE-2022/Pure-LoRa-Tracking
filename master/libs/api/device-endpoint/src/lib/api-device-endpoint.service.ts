import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { AddGatewayDevice, AddSensorDevice, deviceInfos, RemoveDevice } from './../api-device.interface'
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiDeviceEndpointService {

constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }
    
  async processDeviceInfos(body : deviceInfos) : Promise<any> {
    return null;
  }

  async processDeviceAddsensor(body : AddSensorDevice) : Promise<any> {
    return null;
  }

  async processDeviceAddGateway(body : AddGatewayDevice) : Promise<any> {
    return null;
  }

  async processDeviceremove(body : RemoveDevice) : Promise<any> {
    return null;
  }
}
