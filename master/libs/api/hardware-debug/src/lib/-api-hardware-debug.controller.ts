import { Body, Controller, Get } from '@nestjs/common';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { acknowledge } from './hardware-payload.interface';

@Controller('hardware-debug')
export class ApiHardwareDebugController {
  constructor(private apiHardwareDebugService: ApiHardwareDebugService) {}

  @Get('device-status')
  deviceStatusResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceStatusProcess(content);
  }

  @Get('device-up')
  deviceUpResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceUpProcess(content);
  }

  @Get('device-join')
  deviceJoinResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceJoinrocess(content);
  }

  @Get('device-ack')
  deviceAckResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceAckProcess(content);
  }

  @Get('device-error')
  deviceErrorResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceErrorProcess(content);
  }

  @Get('device-location')
  deviceLocationResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceLocationProcess(content);
  }

  @Get('device-txack')
  deviceTxackResponse(@Body() content : any) : acknowledge {
    return this.apiHardwareDebugService.deviceTxackProcess(content);
  }

}
