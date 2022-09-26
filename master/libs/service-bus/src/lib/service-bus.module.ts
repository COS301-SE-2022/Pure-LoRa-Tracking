import { DatabaseProxyModule } from '@lora/database';
import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ServiceBusService } from './service-bus.service';

@Global()
@Module({
  imports:[HttpModule,DatabaseProxyModule],
  controllers: [],
  providers: [ServiceBusService],
  exports: [ServiceBusService],
})
export class ServiceBusModule {}
