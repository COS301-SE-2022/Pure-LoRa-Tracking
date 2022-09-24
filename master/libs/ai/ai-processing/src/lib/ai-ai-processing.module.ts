import { Module, Global } from '@nestjs/common';
import { AiAiProcessingController } from './ai-ai-processing.controller';
import { AiAiProcessingService } from './ai-ai-processing.service';

import { AiParticleFilterModule } from '@lora/ai/particle-filter';
import { AiProcessingStrategyModule } from '@lora/ai/strategy';
import { LocationModule } from '@lora/location';
import { ProcessingApiProcessingBusModule } from '@processing/bus';


@Global()
@Module({
  imports: [ProcessingApiProcessingBusModule, AiProcessingStrategyModule, LocationModule, AiParticleFilterModule],
  controllers: [AiAiProcessingController],
  providers: [AiAiProcessingService],
  exports: [AiAiProcessingService],
})
export class AiAiProcessingModule {}
