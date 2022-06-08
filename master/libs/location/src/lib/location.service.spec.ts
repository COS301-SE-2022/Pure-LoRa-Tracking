import { Test } from '@nestjs/testing';
import { LocationService } from './location.service';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';
import { Location } from '@chirpstack/chirpstack-api/common/common_pb';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    service = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate location', () => {
    const gatewayGateway1 = new UplinkRXInfo();
    const Loc1 = new Location();
    Loc1.setLatitude(-25.82198978570606);
    Loc1.setLongitude(28.33657264709473);
    gatewayGateway1.setLocation(Loc1);
    gatewayGateway1.setRssi(-65);

    const gatewayGateway2: UplinkRXInfo = new UplinkRXInfo();
    const Loc2 =  new Location();
    Loc2.setLatitude(-25.822120162959596);
    Loc2.setLongitude(28.33628833293915);
    gatewayGateway2.setLocation(Loc2);
    gatewayGateway1.setRssi(-90);

    const gatewayGateway3: UplinkRXInfo = new UplinkRXInfo();
    const Loc3 =  new Location();
    Loc3.setLatitude(-25.82212212959596);
    Loc3.setLongitude(28.33628836293915);
    gatewayGateway3.setLocation(Loc3);
    gatewayGateway1.setRssi(-100);

    console.log(gatewayGateway2.hasLocation());
    
    const gatewayData: UplinkRXInfo[] = [];
    gatewayData.push(gatewayGateway1)
    gatewayData.push(gatewayGateway2)
    gatewayData.push(gatewayGateway3)


    service.calculateLocation(gatewayData)
    // expect(service).toBeTruthy();
    // TODO: check thingsboard function call
  });
});
