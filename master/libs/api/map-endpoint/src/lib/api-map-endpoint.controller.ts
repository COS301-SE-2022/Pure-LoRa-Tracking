import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiMapEndpointService } from './api-map-endpoint.service';
import { MapApiHistorical, MapApiHistoricalResponse, MapApiLatest, MapApiLatestResponse, MapApiReserve, MapApiReserveResponse } from './map-api.interface';

@Controller('map')
export class ApiMapEndpointController {
  constructor(private apiMapEndpointService: ApiMapEndpointService) {}

  @Get('')
  response() : string {
    return "Map Reachable"
  }

  @Post('latest')
  LatestRepsonse(@Body() content : MapApiLatest) : MapApiLatestResponse {
    return this.apiMapEndpointService.LatestProcess(content);
  }

  @Post('reserve')
  ReserveRepsonse(@Body() content : MapApiReserve) : MapApiReserveResponse {
    return this.apiMapEndpointService.ReserveProcess(content);
  }

  @Post('historical')
  HistoricalRepsonse(@Body() content : MapApiHistorical) : MapApiHistoricalResponse {
    return this.apiMapEndpointService.HistoricalProcess(content); 
  }
}
