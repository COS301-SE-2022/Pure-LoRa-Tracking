import { DatabaseProxyModule } from '@lora/database';
import { Module, Global } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from './processing-api-processing-bus.service';

@Global()
@Module({
  imports: [DatabaseProxyModule],
  controllers: [],
  providers: [ProcessingApiProcessingBusService],
  exports: [ProcessingApiProcessingBusService],
})
export class ProcessingApiProcessingBusModule {}
