import { AiProcessingStrategyModule } from '@lora/ai/strategy';
import { LocationModule } from '@lora/location';
import { Module, Global } from '@nestjs/common';
import { AiParticleFilterService, particleFilterMultinomialService, particleFilterRSSIMultinomialService } from './ai-particle-filter.service';

@Global()
@Module({
  imports: [AiProcessingStrategyModule, LocationModule],
  controllers: [],
  providers: [AiParticleFilterService, particleFilterMultinomialService, particleFilterRSSIMultinomialService],
  exports: [AiParticleFilterService, particleFilterMultinomialService, particleFilterRSSIMultinomialService],
})
export class AiParticleFilterModule {}
