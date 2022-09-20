import { DatabaseProxyModule } from '@lora/database';
import { LocationModule } from '@lora/location';
import { Module, Global } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from './processing-api-processing-bus.service';

@Global()
@Module({
  imports: [DatabaseProxyModule, LocationModule],
  controllers: [],
  providers: [ProcessingApiProcessingBusService],
  exports: [ProcessingApiProcessingBusService],
})
export class ProcessingApiProcessingBusModule {}
