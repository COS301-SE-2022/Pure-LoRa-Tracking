import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { acknowledge } from './hardware-payload.interface';

@Controller('hardware-debug')
export class ApiHardwareDebugController {
  constructor(private apiHardwareDebugService: ApiHardwareDebugService) {}

  @Post('device-data')
  deviceData(@Query() query: { event: string }, @Body() content: Uint8Array): acknowledge {
    console.log(query);
    if (!(content instanceof Uint8Array))
      return {
        code: 400,
        status: 'Wrong data format',
        explanation: 'Server only accepts protobuf format',
      };
    
    switch (query.event) {
      case 'up':
        return this.apiHardwareDebugService.deviceUpProcess(content);
      case 'status':
        return this.apiHardwareDebugService.deviceStatusProcess(content);
      case 'join':
        return this.apiHardwareDebugService.deviceJoinProcess(content);
      case 'ack':
        return this.apiHardwareDebugService.deviceAckProcess(content);
      case 'txack':
        return this.apiHardwareDebugService.deviceTxackProcess(content);
      case 'error':
        return this.apiHardwareDebugService.deviceErrorProcess(content);
      case 'location':
        return this.apiHardwareDebugService.deviceLocationProcess(content);

    }

  }

}
