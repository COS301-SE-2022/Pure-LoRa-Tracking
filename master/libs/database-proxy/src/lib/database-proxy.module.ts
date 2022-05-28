import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseProxyService } from './database-proxy.service';
import { rssiData, rssiDataSchema } from '../database-interfaces.interface';

@Global()
@Module({
  imports : [MongooseModule.forRoot('mongodb://localhost/lora'),
              MongooseModule.forFeature([{name:rssiData.name, schema:rssiDataSchema}])
],
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule {}
