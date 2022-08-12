import { Module, Global } from '@nestjs/common';
import { AiMockGeneratorTriangulationService } from './ai-mock-generator-triangulation.service';

@Global()
@Module({
  controllers: [],
  providers: [AiMockGeneratorTriangulationService],
  exports: [AiMockGeneratorTriangulationService],
})
export class AiMockGeneratorTriangulationModule {}
