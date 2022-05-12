import { Test } from '@nestjs/testing';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import {
  acknowledge,
  rxInfo,
  txInfo,
  device_status,
  device_up,
  device_join,
  device_ack,
  device_error,
  device_location,
  device_txack,
} from './hardware-payload.interface';

const result: acknowledge = {
  code: 200,
  status: 'ACK',
  explanation: 'Data received...',
};

const rxInfoMock: rxInfo = {
  gatewayID: 'NTA2IDoAEAA=',
  time: '2022-05-11T19:46:00.071074Z',
  timeSinceGPSEpoch: null,
  rssi: -54,
  loRaSNR: 9.25,
  channel: 0,
  rfChain: 1,
  board: 0,
  antenna: 0,
  location: {
    latitude: 13138.1538388,
    longitude: 12138.1534338,
    altitude: 10.2,
  },
  fineTimestampType: 'NONE',
  context: 'YE9+KA==',
  uplinkID: 'rOu9N+e5Q0WP4zaSC3EPtg==',
};

const txInfoMock: txInfo = {
  frequency: BigInt(868100000),
  modulation: 'LORA',
};

describe('ApiHardwareDebugService', () => {
  let service: ApiHardwareDebugService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiHardwareDebugService],
    }).compile();

    service = module.get(ApiHardwareDebugService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  // Tests are preliminary, once data handling is implemented tests are to be updated
  describe('deviceStatusProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_status = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        margin: 6,
        externalPowerSource: true,
        batteryLevelUnavailable: true,
        batteryLevel: 6,
        tags: {},
      };
  
      expect(service.deviceStatusProcess(device_data)).toStrictEqual(result);
    })
  });

  describe('deviceUpProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_up = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        frequency: BigInt(5),
        dr: 1,
        adr: false,
        fCnt: BigInt(4),
        fPort: 1,
        tags: {},
        data: '',
        rxInfo: rxInfoMock,
        txInfo: txInfoMock,
        objectJSON: null,
      };

      expect(service.deviceUpProcess(device_data)).toEqual(result);
    });
  });

  describe('deviceJoinProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_join = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        devAddr: '',
        rxInfo: rxInfoMock,
        txInfo: txInfoMock,
        dr: 1,
        tags: {},
      };

      expect(service.deviceJoinProcess(device_data)).toEqual(result);
    });
  });

  describe('deviceAckProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_ack = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        rxInfo: rxInfoMock,
        txInfo: txInfoMock,
        acknowledged: false,
        fCnt: BigInt(12),
        tags: {},
      };

      expect(service.deviceAckProcess(device_data)).toEqual(result);
    });
  });

  describe('deviceErrorProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_error = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        type: '',
        error: '',
        tags: {},
      };

      expect(service.deviceErrorProcess(device_data)).toEqual(result);
    });
  });

  describe('deviceTxackProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data: device_txack = {
        devEUI: '',
        deviceName: '',
        applicationID: '',
        applicationName: '',
        gatewayID: '',
        fCnt: BigInt(13),
        tags: {},
        txInfo: txInfoMock,
      };
      
      expect(service.deviceTxackProcess(device_data)).toEqual(result);
    });
  });
});
