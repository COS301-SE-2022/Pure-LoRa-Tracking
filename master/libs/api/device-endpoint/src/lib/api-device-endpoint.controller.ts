import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

import { AddGatewayDevice, AddSensorDevice, deviceInfos, deviceResponse, RemoveDevice } from './../api-device.interface'

@Controller('device')
export class ApiDeviceEndpointController {
  constructor(private apiDeviceEndpointService: ApiDeviceEndpointService) {}

  @Get('')
  test() {
    return "device reachable"
  }

  @Post("infos")
  async PostDeviceInfosResponse(@Body() content : deviceInfos) : Promise<deviceResponse> {return await this.apiDeviceEndpointService.processDeviceInfos(content);}

  @Post("add/sensor")
  async PostDeviceAddSensor(@Body() content : AddSensorDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceAddsensor(content);}

  @Post("add/gateway")
  async PostDeviceAddGateway(@Body() content : AddGatewayDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceAddGateway(content);}

  @Post("remove")
  async PostDeviceRemove(@Body() content : RemoveDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceremove(content);}
}
