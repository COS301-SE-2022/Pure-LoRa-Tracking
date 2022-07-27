import { Injectable } from '@nestjs/common';
import { acknowledge } from './api-hardware-payload.interface';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { LocationService } from '@lora/location';
import * as eventMessages from '@chirpstack/chirpstack-api/as/integration/integration_pb';

@Injectable()
export class ApiHardwareGrpcService {
  constructor(
    private tbClientService: ThingsboardThingsboardClientService,
    private locationService: LocationService
  ) {
    // Provisionally using ThingsboardThingsboardTelemetryService
    // TODO: move to ThingsboardThingsboardClientService
    // tbTelemetryService.setToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImY5NmU2MGQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiZWY1NWZmNDAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3MTgxODEsImV4cCI6MTY1NDcyNzE4MX0.G9InEz36rgVqMHqWAiq2my5mOUqcMs1Z_HIL-8j1LGfe3hGkX_zhMJrhU4vGFlIPGedotvq7de3G0ahBUNy9zg")
  }
  // curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username":"reserveuser@reserve.com", "password":"reserve"}' 'http://127.0.0.1:9090/api/auth/login'

  deviceStatusProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.StatusEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  // Most important function, both sensor data and raw data needed for location are received here
  deviceUpProcess(content: Uint8Array) {
    const eventData = eventMessages.UplinkEvent.deserializeBinary(content);

    // Sensor data that will be sent to thingsboard handler
    let dataJSON = eventData.getObjectJson();
    if (dataJSON.length == 0) {
      console.warn(
        '\x1b[33m%s\x1b[0m',
        '[hardware-endpoint] No codec set for device: "' +
          eventData.getDeviceName() +
          '", defaulting to raw data'
      );
      const dataRaw = eventData.getData_asB64();
      dataJSON = JSON.stringify({ raw_data: dataRaw });
    }

    const tags = eventData.getTagsMap();
    const thingsBoardDeviceToken = tags.get('thingsBoardDeviceToken');

    if (thingsBoardDeviceToken == undefined) {
      throw 'Thingsboard device ID not set';
    }

    // Raw gateway info that will be used for location, data is not stripped as we might need other parts of the data in future
    const gateways = eventData.getRxInfoList();
    this.locationService.calculateLocation(gateways, thingsBoardDeviceToken);

    console.log(
      new Date().toISOString(),
      '[hardware-endpoint] Uplink from:',
      eventData.getDeviceName(),
      '|',
      thingsBoardDeviceToken
    );

    this.tbClientService.v1SendTelemetry(thingsBoardDeviceToken, dataJSON);
  }

  deviceJoinProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.JoinEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceAckProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.AckEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceErrorProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.ErrorEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceLocationProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.LocationEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }

  deviceTxackProcess(content: Uint8Array): acknowledge {
    const eventData = eventMessages.TxAckEvent.deserializeBinary(content);

    console.log(eventData);
    return {
      code: 200,
      status: 'ACK',
      explanation: 'Data received...',
    };
  }
}
