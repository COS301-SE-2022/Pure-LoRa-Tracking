import { DatabaseProxyModule, DatabaseProxyService } from '@lora/database';
import { LocationModule, LocationService } from '@lora/location';
import {
  ThingsboardThingsboardClientModule,
  ThingsboardThingsboardClientService,
} from '@lora/thingsboard-client';
import {
  ThingsboardThingsboardTestsModule,
  ThingsboardThingsboardTestsService,
} from '@lora/thingsboard/tests';
import { Test } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ProcessingApiProcessingBusService } from './processing-api-processing-bus.service';

describe('ProcessingApiProcessingBusService', () => {
  let service: ProcessingApiProcessingBusService;
  let locationService: LocationService;
  let tests: ThingsboardThingsboardTestsService;
  let tbClient: ThingsboardThingsboardClientService;
  let dbProxy: DatabaseProxyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseProxyModule,
        ThingsboardThingsboardClientModule,
        LocationModule,
        ThingsboardThingsboardTestsModule,
      ],
      providers: [ProcessingApiProcessingBusService],
    }).compile();

    service = module.get(ProcessingApiProcessingBusService);
    locationService = module.get(LocationService);
    tests = module.get(ThingsboardThingsboardTestsService);
    tbClient = module.get(ThingsboardThingsboardClientService);
    dbProxy = module.get(DatabaseProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('forwardChirpstackData -> success', async () => {
    expect(
      await service.forwardChirpstackData({
        timestamp: 0,
        deviceEUI: 'TEST',
        data: 'TEST',
        eventtype: 'TEST',
        processed: false,
      })
    ).toEqual(true);
  });

  it('forwardChirpstackData -> fail', async () => {
    jest.spyOn(dbProxy, 'saveRSSIinfos').mockImplementationOnce(() => {
      throw new Error('Save failure');
    });
    expect(
      await service.forwardChirpstackData({
        timestamp: 0,
        deviceEUI: 'TEST',
        data: 'TEST',
        eventtype: 'TEST',
        processed: false,
      })
    ).toEqual(false);
  });

  it('getRssiInfo -> success', async () => {
    expect(await service.getRssiInfo('TEST', 1)).toBeDefined();
  });

  it('getRssiInfo -> fail', async () => {
    jest.spyOn(dbProxy, 'fetchRSSIinfos').mockImplementationOnce(() => {
      throw new Error('Save failure');
    });
    expect(await service.getRssiInfo('TEST', 1)).toEqual(false);
  });

  it('markProcessed -> success', async () => {
    expect(
      await service.markProcessed([{ deviceEUI: 'TEST', timestamp: '0' }])
    ).toBeUndefined();
  });

  it('markProcessed -> fail', async () => {
    jest.spyOn(dbProxy, 'markAsProcessed').mockImplementationOnce(() => {
      throw new Error('delete Error');
    });
    expect(
      await service.markProcessed([{ deviceEUI: 'TEST', timestamp: '0' }])
    ).toBeUndefined();
  });

  it('deleteDeviceData -> success', async () => {
    expect(
      await service.deleteDeviceData({ deviceEUI: 'TEST', timestamp: 0 })
    ).toBeUndefined();
  });

  it('deleteDeviceData -> fail', async () => {
    jest.spyOn(dbProxy, 'deleteDeviceData').mockImplementationOnce(() => {
      throw new Error('delete Error');
    });
    expect(
      await service.deleteDeviceData({ deviceEUI: 'TEST', timestamp: 0 })
    ).toBeUndefined();
  });

  it('getLastReady -> success', async () => {
    expect(await service.getLastReady('TEST')).toBeUndefined();
  });

  it('getLastReady -> fail', async () => {
    jest.spyOn(dbProxy, 'deleteReadyAt').mockImplementationOnce(() => {
      throw new Error('Error');
    });
    expect(await service.getLastReady('TEST')).toBeUndefined();
  });

  ///////////////////////////////////////////////

  it('Location service process -> fail', async () => {
    jest
      .spyOn(locationService, 'calculateLocation')
      .mockImplementationOnce(() => {
        throw new Error('Location failed');
      });
    expect(await service.LocationServiceProcess('', '')).toEqual(false);
  });

  it('Location service process -> pass', async () => {
    jest
      .spyOn(locationService, 'calculateLocation')
      .mockImplementationOnce(() => {
        return { latitude: 1, longitude: 1 };
      });
    expect(await service.LocationServiceProcess('', '')).toEqual({
      latitude: 1,
      longitude: 1,
    });
  });

  ///////////////////////////////////////////

  it('send data to tb -> fail', async () => {
    jest.spyOn(tbClient, 'v1SendTelemetry').mockImplementationOnce(() => {
      throw new Error('Telemetry failed');
    });
    expect(
      await service.sendProcessedDatatoTB('', {
        latitude: 1,
        longitude: 2,
        pType: '',
      })
    ).toEqual(false);
  });

  it('send data to tb -> pass', async () => {
    jest.spyOn(tbClient, 'v1SendTelemetry').mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        explanation: 'call finished',
      })
    );
    expect(
      await service.sendProcessedDatatoTB('', {
        latitude: 1,
        longitude: 2,
        pType: '',
      })
    ).toMatchObject({ status: 200, explanation: 'call finished' });
  });

  /////////////////////////////////////////////
  it('get device perimeter -> fail', async () => {
    jest.spyOn(dbProxy, 'getDevicePerimeter').mockImplementationOnce(() => {
      throw new Error('find perimeter failed');
    });
    expect(await service.getDevicePerimeter('')).toEqual(null);
  });

  it('get device perimeter -> pass', async () => {
    jest.spyOn(dbProxy, 'getDevicePerimeter').mockImplementationOnce(() =>
      Promise.resolve({
        deviceID: '122',
        perimeter: [],
        name: 'device',
      })
    );
    expect(await service.getDevicePerimeter('')).toMatchObject({
      deviceID: '122',
      perimeter: [],
      name: 'device',
    });
  });

  /////////////////////////////////////////////
  it('delete device perimeter -> fail', async () => {
    jest
      .spyOn(dbProxy, 'removeDeviceFromPerimeter')
      .mockImplementationOnce(() => {
        throw new Error('delete perimeter failed');
      });
    expect(await service.RemoveDeviceFromPerimeter({ deviceID: '' })).toEqual(
      undefined
    );
  });

  it('delete device perimeter -> pass', async () => {
    jest
      .spyOn(dbProxy, 'removeDeviceFromPerimeter')
      .mockImplementationOnce(() => Promise.resolve());
    expect(await service.RemoveDeviceFromPerimeter({ deviceID: '' })).toEqual(
      undefined
    );
  });

  /////////////////////////////////////////////
  it('update device perimeter name -> fail', async () => {
    jest
      .spyOn(dbProxy, 'updateDevicePerimeterName')
      .mockImplementationOnce(() => {
        throw new Error('delete perimeter failed');
      });
    expect(
      await service.updateDeviceReserveName({ name: '', newName: '' })
    ).toEqual(undefined);
  });

  it('update device perimeter name -> pass', async () => {
    jest
      .spyOn(dbProxy, 'updateDevicePerimeterName')
      .mockImplementationOnce(() => Promise.resolve());
    expect(
      await service.updateDeviceReserveName({ name: '', newName: '' })
    ).toEqual(undefined);
  });

  /////////////////////////////////////////////
  it('update device perimeter -> fail', async () => {
    jest.spyOn(dbProxy, 'updateDevicePerimeter').mockImplementationOnce(() => {
      throw new Error('delete perimeter failed');
    });
    expect(
      await service.updateDevicePerimeter({
        name: '',
        deviceID: '',
        perimeter: [],
      })
    ).toEqual(undefined);
  });

  it('update device perimeter -> pass', async () => {
    jest
      .spyOn(dbProxy, 'updateDevicePerimeter')
      .mockImplementationOnce(() => Promise.resolve());
    expect(
      await service.updateDevicePerimeter({
        name: '',
        deviceID: '',
        perimeter: [],
      })
    ).toEqual(undefined);
  });

  /////////////////////////////////////////////
  it('save device perimeter -> fail', async () => {
    jest.spyOn(dbProxy, 'insertDevicePerimeter').mockImplementationOnce(() => {
      throw new Error('delete perimeter failed');
    });
    expect(
      await service.saveDevicePerimeterToDB({
        name: '',
        deviceID: '',
        perimeter: [],
      })
    ).toEqual(undefined);
  });

  it('save device perimeter -> pass', async () => {
    jest
      .spyOn(dbProxy, 'insertDevicePerimeter')
      .mockImplementationOnce(() => Promise.resolve());
    expect(
      await service.saveDevicePerimeterToDB({
        name: '',
        deviceID: '',
        perimeter: [],
      })
    ).toEqual(undefined);
  });

  /* it('should insert the record', () => {
     service.saveDevicePerimeterToDB(exampleInput)
   })*/
});

const exampleInput = {
  location: {
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [28.23589324951172, -25.757614194750968],
              [28.236021995544434, -25.757681834501373],
              [28.236783742904663, -25.755121159928475],
              [28.235421180725098, -25.754686322913045],
              [28.235206604003903, -25.7521255837504],
              [28.232835531234738, -25.752202889891826],
              [28.23264241218567, -25.7508790152729],
              [28.230850696563717, -25.75099497568315],
              [28.22914481163025, -25.751381509566414],
              [28.22761058807373, -25.752840663638736],
              [28.2253360748291, -25.755420713390688],
              [28.22508931159973, -25.755787906926475],
              [28.22815775871277, -25.75618408815228],
              [28.23126912117004, -25.7565512793277],
              [28.23589324951172, -25.757614194750968],
            ],
          ],
        },
      },
    ],
  },
  device: 'Yb6RZyFqwBYbj2Xjp5HH',
  name: 'tuks',
};
