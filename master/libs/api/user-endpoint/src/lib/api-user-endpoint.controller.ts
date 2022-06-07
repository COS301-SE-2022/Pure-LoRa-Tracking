import { Controller, Get } from '@nestjs/common';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Controller('user')
export class ApiUserEndpointController {
  constructor(private apiUserEndpointService: ApiUserEndpointService) {}

  @Get()
  upState() {return "reachable";}
}
