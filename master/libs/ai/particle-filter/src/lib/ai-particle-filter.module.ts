import { Module, Global } from '@nestjs/common';
import { AiParticleFilterService } from './ai-particle-filter.service';

@Global()
@Module({
  controllers: [],
  providers: [AiParticleFilterService],
  exports: [AiParticleFilterService],
})
export class AiParticleFilterModule {}
