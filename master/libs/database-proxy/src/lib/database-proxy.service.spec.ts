import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { DataInput, InputDataSchema } from '../database-interfaces.interface';
import { DatabaseProxyService } from './database-proxy.service';

describe('DatabaseProxyService', () => {
  let service: DatabaseProxyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
      MongooseModule.forFeature([{name:DataInput.name, schema:InputDataSchema}])],
      providers: [DatabaseProxyService],
    }).compile();

    service = module.get(DatabaseProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it("should insert the location to the mongodb", () => {
    //service.insertLocation({FirstPoint:2, SecondPoint:2, ThirdPoint:3, gateway:"a", latitude:-23.43, longitude:22.2})
  })
});
