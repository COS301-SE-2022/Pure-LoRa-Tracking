import { Injectable } from '@nestjs/common';
import { acknowledge } from './hardware-payload.interface';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import * as eventMessages from '@chirpstack/chirpstack-api/as/integration/integration_pb';

@Injectable()
export class ApiHardwareDebugService {
  constructor (private tbTelemetryService: ThingsboardThingsboardTelemetryService) {
    // Provisionally using ThingsboardThingsboardTelemetryService
    // TODO: move to ThingsboardThingsboardClientService
    tbTelemetryService.setToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImY5NmU2MGQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiZWY1NWZmNDAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ1NTg0NzQsImV4cCI6MTY1NDU2NzQ3NH0.LOzkaserGWNPRaKEYGmZOIW8XiPYahDfqLE0-MV6V1B7fSaisJQugK6QN6Ipxr2pltUBS09uHPaZPG4Vrle4Jg")
  }
  // curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"reserveuser@reserve.com", "password":"reserve"}' 'http://127.0.0.1:9090/api/auth/login'


  deviceStatusProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.StatusEvent.deserializeBinary(content);

    console.log(content);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  // Most important function, both sensor data and raw data needed for location are received here
  deviceUpProcess(content: Uint8Array) {
    const eventData = eventMessages.UplinkEvent.deserializeBinary(content);

    // Raw gateway info that will be used for location
    const gateways = eventData.getRxInfoList();

    // Sensor data that will be sent to thingsboard handler
    let dataJSON = eventData.getObjectJson();
    if (dataJSON.length == 0) {
      console.warn('\x1b[33m%s\x1b[0m','[hardware-endpoint] No codec set for device: "'+ eventData.getDeviceName() + '", defaulting to raw data');
      const dataRaw = eventData.getData_asB64();
      dataJSON = JSON.stringify({ raw_data: dataRaw });
    }

    const tags = eventData.getTagsMap();
    const thingsBoardDeviceId = tags.get('thingsBoardDeviceId');

    if (thingsBoardDeviceId == undefined) {
      throw 'Thingsboard device ID not set';
    }

    console.log((new Date()).toISOString() ,"[hardware-endpoint] Uplink from:", eventData.getDeviceName(), '|', thingsBoardDeviceId);

    this.tbTelemetryService.sendJsonTelemetry(thingsBoardDeviceId, 'DEVICE', dataJSON);

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
