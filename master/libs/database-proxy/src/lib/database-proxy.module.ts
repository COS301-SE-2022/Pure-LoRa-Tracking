import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseProxyService } from './database-proxy.service';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema, ReadyProcess, ReadyProcessSchema, } from '../database-interfaces.interface';

@Global()
@Module({
  imports : [MongooseModule.forRoot('mongodb://lora:lora@localhost:27017'),
              MongooseModule.forFeature([
                {name:AverageInput.name, schema:AverageInputSchema},
                {name:DataInput.name, schema:DataInputSchema},
                {name:ReadyProcess.name, schema:ReadyProcessSchema}
              ])
],
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule {}
