import { Proxy } from './proxy';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema } from './mongo-interface.interface';
import { Mongo } from './mongo';


describe('Proxy', () => {
  let service: Proxy;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
      MongooseModule.forFeature([
        {name:DataInput.name, schema:DataInputSchema},
      {name:AverageInput.name, schema:AverageInputSchema}
    ])],
      providers: [Proxy, Mongo],
    }).compile();

    jest.useFakeTimers()

    service = module.get(Proxy);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy;
  });

  it('should call proxy', async ()=> {
    service.saveRSSIinfos({data:"123",deviceID:"321",eventtype:"111",timestamp:1});
  })
});
