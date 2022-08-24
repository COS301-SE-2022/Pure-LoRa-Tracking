import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseProxyService } from './database-proxy.service';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema, } from '../database-interfaces.interface';

@Global()
@Module({
  imports : [MongooseModule.forRoot('mongodb://lora:@localhost:27017/lora'),
              MongooseModule.forFeature([{name:AverageInput.name, schema:AverageInputSchema},
                {name:DataInput.name, schema:DataInputSchema}])
],
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule {}
