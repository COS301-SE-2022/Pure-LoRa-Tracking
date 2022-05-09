import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiMapEndpointService } from './api-map-endpoint.service';
import { MapApiHistorical, MapApiLatest, MapApiReserve } from './map-api.interface';

@Controller('map')
export class ApiMapEndpointController {
  constructor(private apiMapEndpointService: ApiMapEndpointService) {}

  @Get('')
  response() : string {
    return "Map Reachable"
  }

  @Post('latest')
  LatestRepsonse(@Body() content : MapApiLatest) {
    return {status:'success'};
  }

  @Post('reserve')
  ReserveRepsonse(@Body() content : MapApiReserve) {
    return {status:'success'};
  }

  @Post('historical')
  HistoricalRepsonse(@Body() content : MapApiHistorical) {
    return {status:'success'};
  }
}
