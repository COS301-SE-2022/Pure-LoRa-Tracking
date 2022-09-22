import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from "@nestjs/terminus" 
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TerminusModule,HttpModule,MongooseModule.forRoot('mongodb://lora:lora@localhost:27017')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
