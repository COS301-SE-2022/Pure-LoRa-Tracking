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

  /*@Post('latest')
  LatestRepsonse(@Body() content : MapApiLatest) : MapApiLatestResponse {
    return this.apiMapEndpointService.LatestProcess(content);
  }*/

  @Post('reserve')
  async ReserveRepsonse(@Body() content : MapApiReserve) : Promise<MapApiReserveResponse> {
    return await this.apiMapEndpointService.ReserveProcess(content);
  }

  @Post('historical')
  async HistoricalRepsonse(@Body() content : MapApiHistorical) : Promise<MapApiHistoricalResponse> {
    return await this.apiMapEndpointService.HistoricalProcess(content); 
  }
}
