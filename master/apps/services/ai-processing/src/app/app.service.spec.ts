import { AiProcessingStrategyModule, AiProcessingStrategyService } from '@lora/ai/strategy';
import { LocationModule, LocationService } from '@lora/location';
import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule, ProcessingApiProcessingBusService } from '@processing/bus';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let stratArray: AiProcessingStrategyService[];
  let serviceBus: ProcessingApiProcessingBusService;
  let locationService: LocationService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports :[ProcessingApiProcessingBusModule, AiProcessingStrategyModule, LocationModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
    serviceBus = app.get(ProcessingApiProcessingBusService);
    locationService = app.get(LocationService)

    stratArray = new Array<AiProcessingStrategyService>()
    
  });

  it("should exist", ()=> {
    expect(service).toBeTruthy();
  })

  /*it('should store the info in the db', ()=> {
    service.processPerimeterRequest(exampleData)
  })*/

  /*it('should convert to rssi and forward', ()=> {
    stratArray.push(new particleFilterRSSIMultinomialService(locationService, serviceBus));
    stratArray[0].processData({rssi:[1,2,3]})
  })*/

});
