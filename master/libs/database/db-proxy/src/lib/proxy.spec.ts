import { Proxy } from './proxy';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema } from './mongo-interface.interface';
import { Mongo } from './mongo';
import { Logger } from '@nestjs/common';


describe('Proxy', () => {
  let service: Proxy;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [Logger, MongooseModule.forRoot('mongodb://localhost/lora'),
      MongooseModule.forFeature([
        {name:DataInput.name, schema:DataInputSchema},
      {name:AverageInput.name, schema:AverageInputSchema}
    ])],
      providers: [Proxy, Mongo],
    }).compile();

    jest.useFakeTimers()
    jest.setTimeout(10000)

    service = module.get(Proxy);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy;
  });

  it('should call proxy', async ()=> {
    const devices = 5;
    const entriesPerDevice = 5;
    for (let i = 0; i < devices; i++) {
      const eui : number = Math.floor(Math.random() *1000);
      for (let j = 0; j < entriesPerDevice; j++) {
        service.saveRSSIinfos({data:Math.random().toString(),deviceEUI:eui.toString(),eventtype:"test event",timestamp:Date.now()});
      }
    }
  })

  it('should query the proxy for n records', async ()=> {
    console.table(await service.fetchRSSIinfos('254', 5));
  })
});
