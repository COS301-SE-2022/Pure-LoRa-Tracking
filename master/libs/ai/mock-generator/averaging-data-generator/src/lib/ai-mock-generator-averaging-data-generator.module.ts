import { Module, Global } from '@nestjs/common';
import { AiMockGeneratorAveragingDataGeneratorService } from './ai-mock-generator-averaging-data-generator.service';

@Global()
@Module({
  controllers: [],
  providers: [AiMockGeneratorAveragingDataGeneratorService],
  exports: [AiMockGeneratorAveragingDataGeneratorService],
})
export class AiMockGeneratorAveragingDataGeneratorModule {}
