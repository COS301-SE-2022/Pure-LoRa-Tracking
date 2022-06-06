import { Injectable } from '@nestjs/common';
import { acknowledge } from './hardware-payload.interface';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import * as eventMessages from '@chirpstack/chirpstack-api/as/integration/integration_pb';

@Injectable()
export class ApiHardwareDebugService {
  deviceStatusProcess(content: Uint8Array): acknowledge {
    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  // Most important function, both sensor data and raw data needed for location are received here
  deviceUpProcess(content: Uint8Array): acknowledge {
    const username = process.env.TB_PASSWORD;
    const password = process.env.TB_USERNAME;
    const eventData = eventMessages.UplinkEvent.deserializeBinary(content);

    // Raw gateway info that will be used for location
    const gateways = eventData.getRxInfoList();

    // Sensor data that will be sent to thingsboard handler
    let dataJSON = eventData.getObjectJson();
    if (dataJSON.length == 0) {
      console.warn('\x1b[33m%s\x1b[0m','No codec set for device: "'+ eventData.getDeviceName() + '", defaulting to raw data');
      const dataRaw = eventData.getData_asB64();
      dataJSON = JSON.stringify({ raw_data: dataRaw });
    }

    console.log('[',new Date(),"] Uplink from: " + eventData.getDeviceName());    

    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceJoinProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.JoinEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceAckProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.AckEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceErrorProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.ErrorEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceLocationProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.LocationEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceTxackProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.TxAckEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }
}
