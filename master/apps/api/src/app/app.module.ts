import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiApiRouterModule } from '@lora/apiRouter'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ApiApiRouterModule,ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
