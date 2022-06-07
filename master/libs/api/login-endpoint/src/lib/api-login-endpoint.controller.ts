import { Controller } from '@nestjs/common';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

@Controller('login')
export class ApiLoginEndpointController {
  constructor(private apiLoginEndpointService: ApiLoginEndpointService) {}
}
