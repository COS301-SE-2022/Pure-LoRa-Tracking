import { Module, Global } from '@nestjs/common';
import { AiProcessingStrategyService } from './ai-processing-strategy.service';

@Global()
@Module({
  controllers: [],
  providers: [AiProcessingStrategyService],
  exports: [AiProcessingStrategyService],
})
export class AiProcessingStrategyModule {}
