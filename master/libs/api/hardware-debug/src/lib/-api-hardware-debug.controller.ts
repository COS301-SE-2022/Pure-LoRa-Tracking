import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { acknowledge } from './hardware-payload.interface';

@Controller('hardware-debug')
export class ApiHardwareDebugController {
  constructor(private apiHardwareDebugService: ApiHardwareDebugService) {}

  // @Post('device-status')
  // deviceStatusResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceStatusProcess(content);
  // }

  @Post('device-data')
  deviceData(@Query() query: { event: string }, @Body() content: any): acknowledge {
    console.log(query);
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


    // if (query.event == 'up')
    //   return this.apiHardwareDebugService.deviceUpProcess(content);
  }

  // @Post('device-join')
  // deviceJoinResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceJoinrocess(content);
  // }

  // @Post('device-ack')
  // deviceAckResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceAckProcess(content);
  // }

  // @Post('device-error')
  // deviceErrorResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceErrorProcess(content);
  // }

  // @Post('device-location')
  // deviceLocationResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceLocationProcess(content);
  // }

  // @Post('device-txack')
  // deviceTxackResponse(@Body() content: any): acknowledge {
  //   return this.apiHardwareDebugService.deviceTxackProcess(content);
  // }
}
