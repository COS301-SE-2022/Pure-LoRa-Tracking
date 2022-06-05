import { Controller } from '@nestjs/common';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

@Controller('api-device-endpoint')
export class ApiDeviceEndpointController {
  constructor(private apiDeviceEndpointService: ApiDeviceEndpointService) {}
}
