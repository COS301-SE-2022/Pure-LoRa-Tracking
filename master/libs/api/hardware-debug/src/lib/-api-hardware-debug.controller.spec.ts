import { Test } from '@nestjs/testing';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';

describe('ApiHardwareDebugController', () => {
  let controller: ApiHardwareDebugController;
  let service: ApiHardwareDebugService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiHardwareDebugService],
      controllers: [ApiHardwareDebugController],
    }).compile();

    controller = module.get(ApiHardwareDebugController);
    service = module.get(ApiHardwareDebugService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('deviceData', () => {
    it('should return acknowledge interface', () => {
      const result = {
        code: 200,
        status: 'ACK',
        explanation: 'Data received...',
      };
      // const data = {event : 'up'};

      expect(controller.deviceData({event : 'up'}, '')).toStrictEqual(result);
      expect(controller.deviceData({event : 'status'}, '')).toStrictEqual(result);
      expect(controller.deviceData({event : 'join'}, '')).toStrictEqual(result);
      expect(controller.deviceData({event : 'ack'}, '')).toStrictEqual(result);
      expect(controller.deviceData({event : 'txack'}, '')).toStrictEqual(result);
      expect(controller.deviceData({event : 'error'}, '')).toStrictEqual(result);
    });

    it('should return not return acknowledge interface', () => {
      const data = {
        event: '',
      };

      jest.spyOn(service, 'deviceStatusProcess').getMockImplementation();

      expect(controller.deviceData(data, '')).toStrictEqual(undefined);
    });
  });
});
