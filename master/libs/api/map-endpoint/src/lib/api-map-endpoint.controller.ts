import { Controller, Get } from '@nestjs/common';
import { ApiMapEndpointService } from './api-map-endpoint.service';

@Controller('item')
export class ApiMapEndpointController {
  constructor(private apiMapEndpointService: ApiMapEndpointService) {}

  @Get('')
  respond() {
    return 'test'
  }
}
