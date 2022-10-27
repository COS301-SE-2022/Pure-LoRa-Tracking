import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import {
  AverageInput,
  AverageInputSchema,
  DataInput,
  DataInputSchema,
  DevicePerimeter,
  DevicePerimeterSchema,
  ReadyProcess,
  ReadyProcessSchema,
} from '../database-interfaces.interface';
import { DatabaseProxyService } from './database-proxy.service';

describe('DatabaseProxyService', () => {
  let service: DatabaseProxyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://lora:lora@localhost:27017'),
        MongooseModule.forFeature([
          { name: AverageInput.name, schema: AverageInputSchema },
          { name: DataInput.name, schema: DataInputSchema },
          { name: ReadyProcess.name, schema: ReadyProcessSchema },
          { name: DevicePerimeter.name, schema: DevicePerimeterSchema },
        ]),
      ],
      providers: [DatabaseProxyService],
    }).compile();

    service = module.get(DatabaseProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('live test -> should insert the location set to the mongodb', async () => {
    expect(
      await service.insertAverageRecord({
        deviceID: 'TEST',
        locations: [{ latitude: -12, longitude: 23 }],
      })
    ).toBeDefined();
  });

  it('live test -> get data', async () => {
    expect(await service.getAverageData('TEST')).toBeDefined();
  });

  it('should call proxy', async () => {
    const eui: number = Math.floor(Math.random() * 1000);
    expect(
      await service.saveRSSIinfos({
        data: Math.random().toString(),
        deviceEUI: eui.toString(),
        eventtype: 'TEST',
        timestamp: Date.now(),
        processed: false,
      })
    ).toBeDefined();
  });

  it('should query the proxy for n records', async () => {
    expect((await service.fetchRSSIinfos('TEST', 5))[1]).toBeUndefined();
  });

  it('should delete device data', async () => {
    expect(service.deleteDeviceData('TEST', 1662112541314)).toBeDefined();
  });

  it('should marked as processed', async () => {
    expect(
      await service.markAsProcessed([
        { deviceEUI: 'TEST', timestamp: '1662112541314' },
      ])
    ).toBeUndefined();
  });

  it('should add to ready', async () => {
    expect(
      await service.addToReady({
        deviceEUI: 'TEST',
        timestamp: 1662112541314,
        data: 'TEST',
      })
    ).toBeDefined();
  });

  it('should check if ready', async () => {
    expect(await service.checkNumReady('TEST')).toBeDefined();
  });

  it('should get latest ready', async () => {
    expect(await service.getLatestReady('TEST')).toBeDefined();
  });

  it('should insert device perimeter', async () => {
    expect(
      await service.insertDevicePerimeter({
        deviceID: 'TEST',
        perimeter: [4, 5],
        name: 'TEST',
      })
    ).toBeUndefined();
  });

  it('should update device perimeter name', async () => {
    expect(
      await service.updateDevicePerimeterName({
        name: 'TEST',
        newName: 'TEST',
      })
    ).toBeUndefined();
  });

  it('should update device perimeter', async () => {
    expect(
      await service.updateDevicePerimeter({
        perimeter: [5, 4],
        name: 'TEST',
      })
    ).toBeUndefined();
  });

  it('should remove device perimeter', async () => {
    expect(
      await service.removeDeviceFromPerimeter({
        deviceID: 'TEST',
      })
    ).toBeUndefined();
  });

  it('return device info for perimeter', async () => {
    expect(await service.getDevicePerimeter('TEST')).toBeDefined();
  });

  it('return more info', async () => {
    expect(await service.getMoreInfo('TEST')).toBeUndefined();
  });
});
