import { Test } from '@nestjs/testing';
import { LocationService } from './location.service';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';
import { Location } from '@chirpstack/chirpstack-api/common/common_pb';
import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Logger } from '@nestjs/common';

describe('LocationService', () => {
  let service: LocationService;
  let tbClient: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule],
      providers: [LocationService],
    }).compile();

    service = module.get(LocationService);
    tbClient = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate location', () => {
    const gatewayGateway1 = new UplinkRXInfo();
    const Loc1 = new Location();
    Loc1.setLatitude(-25.82198978570606);
    Loc1.setLongitude(28.33607836393915);
    gatewayGateway1.setLocation(Loc1);
    gatewayGateway1.setRssi(-85);

    const gatewayGateway2: UplinkRXInfo = new UplinkRXInfo();
    const Loc2 =  new Location();
    Loc2.setLatitude(-25.822120162959596);
    Loc2.setLongitude(28.33668836393915);
    gatewayGateway2.setLocation(Loc2);
    gatewayGateway2.setRssi(-80);

    const gatewayGateway3: UplinkRXInfo = new UplinkRXInfo();
    const Loc3 =  new Location();
    Loc3.setLatitude(-25.82242213959696);
    Loc3.setLongitude(28.33638836393915);
    gatewayGateway3.setLocation(Loc3);
    gatewayGateway3.setRssi(-85);

    console.log(gatewayGateway2.hasLocation());
    
    const gatewayData: UplinkRXInfo[] = [];
    gatewayData.push(gatewayGateway1)
    gatewayData.push(gatewayGateway2)
    gatewayData.push(gatewayGateway3)

    if (process.env.PURELORABUILD != 'DEV')
    jest.spyOn(tbClient,'v1SendTelemetry').mockImplementation();
    service.calculateLocation(gatewayData, 'sAcQ4Qj54v9wLWi40thD');
    // expect(service).toBeTruthy();
    // TODO: check thingsboard function call
  });

  it('should give the distance between two point in meters', () => {
    expect(service.distanceInMeters(-25.79089916441019, 28.22651758790016, -25.79136043396041, 28.226017355918884)).toEqual(71.68678217150459);
  });

  it('should compute the RSSI from distance', ()=> {
    expect(service.MetersToRSSI(1)).toEqual(-61.1);
    expect(service.MetersToRSSI(2)).toEqual(-7.030899869919436);
  })
});
