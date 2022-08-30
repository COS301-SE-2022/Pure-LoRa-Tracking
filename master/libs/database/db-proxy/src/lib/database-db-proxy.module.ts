import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongo } from './mongo';
import { AverageInput, AverageInputSchema, DataInput, DataInputSchema } from './mongo-interface.interface';

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/lora'),
  MongooseModule.forFeature([
    {name:DataInput.name, schema:DataInputSchema},
  {name:AverageInput.name, schema:AverageInputSchema}
])],
  controllers: [],
  providers: [Proxy, Mongo],
  exports: [Proxy],
})
export class DatabaseDbProxyModule { }
