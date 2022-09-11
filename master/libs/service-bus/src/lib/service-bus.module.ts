import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ServiceBusService } from './service-bus.service';

@Global()
@Module({
  imports:[HttpModule],
  controllers: [],
  providers: [ServiceBusService],
  exports: [ServiceBusService],
})
export class ServiceBusModule {}
