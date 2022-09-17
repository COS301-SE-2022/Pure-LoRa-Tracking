import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseProxyService } from './database-proxy.service';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema, DevicePerimeter, DevicePerimeterSchema, } from '../database-interfaces.interface';

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/lora'),
  MongooseModule.forFeature([
    { name: AverageInput.name, schema: AverageInputSchema },
    { name: DataInput.name, schema: DataInputSchema },
    { name: DevicePerimeter.name, schema: DevicePerimeterSchema }
  ])
  ],
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule { }
