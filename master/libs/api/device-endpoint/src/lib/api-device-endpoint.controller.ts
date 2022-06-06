import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

import { AddGatewayDevice, AddSensorDevice, deviceInfos, RemoveDevice } from './../api-device.interface'

@Controller('device')
export class ApiDeviceEndpointController {
  constructor(private apiDeviceEndpointService: ApiDeviceEndpointService) {}

  @Get('')
  test() {
    return "device reachable"
  }

  @Post("infos")
  async PostDeviceInfosResponse(@Body() content : deviceInfos) {return this.apiDeviceEndpointService.processDeviceInfos(content);}

  @Post("add/sensor")
  async PostDeviceAddSensor(@Body() content : AddSensorDevice) {return this.apiDeviceEndpointService.processDeviceAddsensor(content);}

  @Post("add/gateway")
  async PostDeviceAddGateway(@Body() content : AddGatewayDevice) {return this.apiDeviceEndpointService.processDeviceAddGateway(content);}

  @Post("remove")
  async PostDeviceRemove(@Body() content : RemoveDevice) {return this.apiDeviceEndpointService.processDeviceremove(content);}
}
