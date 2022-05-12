import { Injectable } from '@nestjs/common';
import { acknowledge, device_status, device_up, 
        device_join, device_ack, device_error, 
        device_location ,device_txack } from './hardware-payload.interface';

@Injectable()
export class ApiHardwareDebugService {
  deviceStatusProcess(content: device_status): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceUpProcess(content: device_up): acknowledge {
    console.log(content);
    // console.log(content.applicationID);
    // console.log(content.devEUI);
    // console.log(content.rxInfo.location);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceJoinProcess(content: device_join): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceAckProcess(content: device_ack): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceErrorProcess(content: device_error): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceLocationProcess(content: device_location): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceTxackProcess(content: device_txack): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }
}
