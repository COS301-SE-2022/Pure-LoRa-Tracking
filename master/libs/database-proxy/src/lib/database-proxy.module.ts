import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseProxyService } from './database-proxy.service';
import { AverageInput, AverageInputSchema, } from '../database-interfaces.interface';

@Global()
@Module({
  imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
              MongooseModule.forFeature([{name:AverageInput.name, schema:AverageInputSchema}])
],
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule {}
