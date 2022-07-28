import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AverageInput, AverageInputSchema } from '../database-interfaces.interface';
import { DatabaseProxyService } from './database-proxy.service';

describe('DatabaseProxyService', () => {
  let service: DatabaseProxyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
      MongooseModule.forFeature([{name:AverageInput.name, schema:AverageInputSchema}])],
      providers: [DatabaseProxyService],
    }).compile();

    service = module.get(DatabaseProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it("live test -> should insert the location set to the mongodb", async() => {
    //console.log(await service.insertAverageRecord({deviceID:"123482hjk-2drewe43-3242sd", locations:[{latitude:-12, longitude:23}]}))
  })

  it("live test -> get data", async() => {
   // console.log(await service.getAverageData("123482hjk-2drewe43-3242sd"))
  })

  
});
