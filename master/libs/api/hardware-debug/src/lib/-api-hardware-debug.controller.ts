import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { acknowledge } from './hardware-payload.interface';

@Controller('hardware-debug')
export class ApiHardwareDebugController {
  resError: acknowledge = {
    code: 400,
    status: 'Invalid request',
    explanation: 'Request format and/or request data is invalid',
  };
  resSuccess: acknowledge = {
    code: 200,
    status: 'OK',
    explanation: 'Data successfully processed',
  };

  constructor(private apiHardwareDebugService: ApiHardwareDebugService) {}
  // TODO: Implement token authentication
  @Post('device-data')
  deviceData(@Query() query: { event: string }, @Body() content: Uint8Array): acknowledge {
    console.log(query);
    if (!(content instanceof Uint8Array)) {
      console.error('\x1b[31m%s\x1b[0m','Server only accepts protobuf format for chirpstack integration');
      return {
        code: 400,
        status: 'Wrong data format',
        explanation: 'Server only accepts protobuf format',
      };
    }
    
    const errPrep = (new Date()).toISOString() +' [hardware-endpoint] ERROR: ';

    switch (query.event) {
      case 'up':
        try {
          this.apiHardwareDebugService.deviceUpProcess(content);  
        } catch (error) {
          console.log('\x1b[31m%s\x1b[0m ', errPrep  + error);
          return this.resError;
        }
        return this.resSuccess;
      case 'status':
        try {
          this.apiHardwareDebugService.deviceStatusProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;
      case 'join':
        try {
          this.apiHardwareDebugService.deviceJoinProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;
      case 'ack':
        try {
          this.apiHardwareDebugService.deviceAckProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;
      case 'txack':
        try {
          this.apiHardwareDebugService.deviceTxackProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;
      case 'error':
        try {
          this.apiHardwareDebugService.deviceErrorProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;
      case 'location':
        try {
          this.apiHardwareDebugService.deviceLocationProcess(content);
        } catch (error) {
          console.error('\x1b[31m%s\x1b[0m ', errPrep, error);
          return this.resError;
        }
        return this.resSuccess;

    }

  }

}
