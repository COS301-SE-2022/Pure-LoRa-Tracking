import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

import { AddGatewayDevice, AddSensorDevice, deviceAssign, deviceAvailable, deviceInfos, deviceResponse, GatewayLocationAdd, GatewayLocationInfo, GetGatewaysInput, RemoveDevice,GetMoreInfoInput } from './../api-device.interface'
import { UserSenserDataInput } from '../api-device.interface';

@Controller('device')
export class ApiDeviceEndpointController {
  constructor(private apiDeviceEndpointService: ApiDeviceEndpointService) {}

  @Get('')
  test() {
    return "device reachable"
  }

  @Post("infos")
  async PostDeviceInfosResponse(@Body() content : deviceInfos) : Promise<deviceResponse> {return await this.apiDeviceEndpointService.processDeviceInfos(content);}

  @Post("admin/add/sensor")
  async PostDeviceAddSensor(@Body() content : AddSensorDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceAddsensor(content);}

  @Post("admin/add/gateway")
  async PostDeviceAddGateway(@Body() content : AddGatewayDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceAddGateway(content);}

  @Post("admin/delete")
  async PostDeviceRemove(@Body() content : RemoveDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceremove(content);}

  @Post("admin/available")
  async PostDeviceAvailableResponse(@Body() content : deviceAvailable) : Promise<deviceResponse> {return await this.apiDeviceEndpointService.processDeviceAvailable(content);}

  @Post("admin/assign")
  async PostDeviceAssignResponse(@Body() content : deviceAssign) : Promise<deviceResponse> {return await this.apiDeviceEndpointService.processDeviceAssign(content);}

  @Post("admin/unassign")
  async PostDeviceRemoveFromReserve(@Body() content : RemoveDevice) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processDeviceRemoveDeviceFromReserve(content);}
  
  @Post("admin/sensordata")
  async GetSensorDataFromDevice(@Body() content : UserSenserDataInput) : Promise<deviceResponse> {return this.apiDeviceEndpointService.UserGetDeviceSensorData(content);}

  @Post("gateway/info")
  async GetGateways(@Body() content : GetGatewaysInput) : Promise<deviceResponse> {return this.apiDeviceEndpointService.getGatewaysProcess(content);}

  @Post("gateway/info/location")
  async PostGatewayInfo(@Body() content : GatewayLocationInfo) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processGatewayGetLocationInfo(content);}

  @Post("admin/gateway/info/location/add")
  async PostGatewayAdd(@Body() content : GatewayLocationAdd) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processGatewaySetLocation(content);}

  @Post("admin/sensor/info/profiles")
  async PostGatewayProfiles() : Promise<deviceResponse> {return this.apiDeviceEndpointService.processGetDeviceProfiles();}

  @Post("moreinfo")
  async PostMoreInfo(@Body() content:GetMoreInfoInput) : Promise<deviceResponse> {return this.apiDeviceEndpointService.processGetMoreInfo(content);}

}
