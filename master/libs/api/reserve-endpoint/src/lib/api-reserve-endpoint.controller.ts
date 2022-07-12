import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';
import {ReserveCreateEndpoint, ReserveEndpoint, ReserveSetEndpoint, ReserveResponse} from "../reserve-endpoint.interface";

@Controller('reserve')
export class ApiReserveEndpointController {
  constructor(private apiReserveEndpointService: ApiReserveEndpointService) {}

  @Get('')
  test() {
    return "reachable"
  }

  @Post("create")
  async PostReserveCreateResponse(@Body() body : ReserveCreateEndpoint) : Promise<ReserveResponse> {return await this.apiReserveEndpointService.processReserveCreate(body);}

  @Post("remove")
  async PostReserveRemoveResponse(@Body() body : ReserveEndpoint) : Promise<ReserveResponse> {return await this.apiReserveEndpointService.processReserveRemove(body);}

  @Post("location")
  async PostReserveResponse(@Body() body : ReserveEndpoint) : Promise<ReserveResponse> {return await this.apiReserveEndpointService.processReserveInfo(body);}


  @Post("location/set")
  async PostReserveSetResponse(@Body() body : ReserveSetEndpoint) : Promise<ReserveResponse> {return await this.apiReserveEndpointService.processReserveSet(body);}

}
