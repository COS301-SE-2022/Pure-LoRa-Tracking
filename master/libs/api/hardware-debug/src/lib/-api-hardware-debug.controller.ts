import { Controller, Get } from '@nestjs/common';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';

@Controller('hardware-debug')
export class ApiHardwareDebugController {
  constructor(private apiHardwareDebugService: ApiHardwareDebugService) {}

  

}
