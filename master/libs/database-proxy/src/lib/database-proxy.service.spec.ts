import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema, DevicePerimeter, DevicePerimeterSchema } from '../database-interfaces.interface';
import { DatabaseProxyService } from './database-proxy.service';

describe('DatabaseProxyService', () => {
  let service: DatabaseProxyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
      MongooseModule.forFeature([
        {name:DataInput.name, schema:DataInputSchema},
      {name:AverageInput.name, schema:AverageInputSchema},
      {name:DevicePerimeter.name, schema:DevicePerimeterSchema}
    ])],
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

  it('should call proxy', async ()=> {
    /*const devices = 5;
    const entriesPerDevice = 5;
    for (let i = 0; i < devices; i++) {
      const eui : number = Math.floor(Math.random() *1000);
      for (let j = 0; j < entriesPerDevice; j++) {
        service.saveRSSIinfos({data:Math.random().toString(),deviceEUI:eui.toString(),eventtype:"test event",timestamp:Date.now()});
      }
    }*/
  })

  it('should query the proxy for n records', async ()=> {
    //console.table((await service.fetchRSSIinfos('254', 5))[1]);
  })

  it('should delete device data', async ()=> {
    //console.table(service.deleteDeviceData('254', 1662112541314));
  })

  it(('return device info for perimeter'), async() => {
    //console.log(await service.getDevicePerimeter("Yb6RZyFqwBYbj2Xjp5HH"))
  })
});
