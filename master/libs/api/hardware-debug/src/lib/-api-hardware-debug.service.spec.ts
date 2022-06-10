import { Test } from '@nestjs/testing';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import * as eventMessages from '@chirpstack/chirpstack-api/as/integration/integration_pb';
import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { LocationModule, LocationService } from '@lora/location';
import { acknowledge } from './hardware-payload.interface';

const result: acknowledge = {
  code: 200,
  status: 'ACK',
  explanation: 'Data received...',
};

describe('ApiHardwareDebugService', () => {
  let service: ApiHardwareDebugService;
  let locationService: LocationService;
  let tbClientService: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule, LocationModule],
      providers: [ApiHardwareDebugService],
    }).compile();

    service = module.get(ApiHardwareDebugService);
    locationService = module.get(LocationService);
    tbClientService = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  // Tests are preliminary, once data handling is implemented tests are to be updated
  describe('ApiHardwareDebugService', () => {
    it('should return acknowledge interface', () => {
      const device_data = new eventMessages.StatusEvent();
      //Inputs
      const input = device_data.serializeBinary()
      
      jest.spyOn(eventMessages.StatusEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      })
  
      expect(service.deviceStatusProcess(input)).toStrictEqual(result);
    })
  });

  describe('deviceUpProcess', () => {
    it('should return', () => {
      const device_data = new eventMessages.UplinkEvent();
      const deviceToken = 'sAcQ4Qj54v9wLWi40thD';
      const jsonData = 'test_input';
      //Inputs
      device_data.setObjectJson(jsonData);
      let input = device_data.serializeBinary();
      


      jest.spyOn(eventMessages.UplinkEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      });

      const calcLocation = jest.spyOn(locationService, 'calculateLocation').mockImplementation();

      jest.spyOn(tbClientService, 'v1SendTelemetry').mockImplementation(async (thingsBoardDeviceToken, dataJSON) => {
        expect(thingsBoardDeviceToken).toBe(deviceToken);
        expect(dataJSON).toBe(jsonData);
        return {
          status: 200,
          explanation: 'call finished',
        }        
      }); 
      expect(() => { service.deviceUpProcess(input)}).toThrow('Thingsboard device ID not set')
      

      device_data.getTagsMap().set('thingsBoardDeviceToken', deviceToken);
      input = device_data.serializeBinary()
      expect(service.deviceUpProcess(input)).toBe(undefined);
      expect(calcLocation).toBeCalled();
    });
  });

  describe('deviceJoinProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data = new eventMessages.JoinEvent();
        //Inputs
      const input = device_data.serializeBinary()
      
      jest.spyOn(eventMessages.JoinEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      })

      expect(service.deviceJoinProcess(input)).toEqual(result);
    });
  });

  describe('deviceAckProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data = new eventMessages.AckEvent();
      //Inputs
      const input = device_data.serializeBinary()
      
      jest.spyOn(eventMessages.AckEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      })

      expect(service.deviceAckProcess(input)).toEqual(result);
    });
  });

  describe('deviceErrorProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data = new eventMessages.ErrorEvent();
      //Inputs
      const input = device_data.serializeBinary()
      
      jest.spyOn(eventMessages.ErrorEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      })

      expect(service.deviceErrorProcess(input)).toEqual(result);
    });
  });

  describe('deviceTxackProcess', () => {
    it('should return acknowledge interface', () => {
      const device_data = new eventMessages.TxAckEvent();
      //Inputs
      const input = device_data.serializeBinary()
      
      jest.spyOn(eventMessages.TxAckEvent, 'deserializeBinary').mockImplementation((content) => {
        expect(content).toBe(input);
        return device_data;
      });
      
      expect(service.deviceTxackProcess(input)).toEqual(result);
    });
  });
});
