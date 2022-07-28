import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiHardwareGrpcController } from './api-hardware-grpc.controller';
import { ApiHardwareGrpcService } from './api-hardware-grpc.service';
import { acknowledge } from './api-hardware-payload.interface';

describe('ApiHardwareGrpcController', () => {
  let controller: ApiHardwareGrpcController;
  let service: ApiHardwareGrpcService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule, LocationModule],
      providers: [ApiHardwareGrpcService],
      controllers: [ApiHardwareGrpcController],
    }).compile();

    controller = module.get(ApiHardwareGrpcController);
    service = module.get(ApiHardwareGrpcService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('deviceData', () => {
    it('should return acknowledge interface', () => {
      const result: acknowledge = {
        code: 200,
        status: 'OK',
        explanation: 'Data successfully processed',
      };
      // const resError: acknowledge = {
      //   code: 400,
      //   status: 'Invalid request',
      //   explanation: 'Request format and/or request data is invalid',
      // };
      // const data = {event : 'up'};

      // service = moduleMock;
      // jest.mock('./-api-hardware-debug.service');
      jest.spyOn(service, 'deviceStatusProcess').mockImplementation();
      jest.spyOn(service, 'deviceUpProcess').mockImplementation();
      jest.spyOn(service, 'deviceJoinProcess').mockImplementation();
      jest.spyOn(service, 'deviceAckProcess').mockImplementation();
      jest.spyOn(service, 'deviceErrorProcess').mockImplementation();
      jest.spyOn(service, 'deviceLocationProcess').mockImplementation();
      jest.spyOn(service, 'deviceTxackProcess').mockImplementation();

      // service = moduleMock;
      const input: Uint8Array = new Uint8Array();

      expect(controller.deviceData({ event: 'up' }, input)).toStrictEqual(
        result
      );
      expect(controller.deviceData({ event: 'status' }, input)).toStrictEqual(
        result
      );
      expect(controller.deviceData({ event: 'join' }, input)).toStrictEqual(
        result
      );
      expect(controller.deviceData({ event: 'ack' }, input)).toStrictEqual(
        result
      );
      expect(controller.deviceData({ event: 'txack' }, input)).toStrictEqual(
        result
      );
      expect(controller.deviceData({ event: 'error' }, input)).toStrictEqual(
        result
      );
    });

    it('should return not return acknowledge interface', () => {
      const data = {
        event: '',
      };
      const input: Uint8Array = new Uint8Array();

      jest.spyOn(service, 'deviceStatusProcess').getMockImplementation();

      expect(controller.deviceData(data, input)).toStrictEqual(undefined);
    });
  });
});
