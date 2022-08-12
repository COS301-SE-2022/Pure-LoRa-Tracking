import { Module, Global } from '@nestjs/common';
import { AiAiTriangulationService } from './ai-ai-triangulation.service';

@Global()
@Module({
  controllers: [],
  providers: [AiAiTriangulationService],
  exports: [AiAiTriangulationService],
})
export class AiAiTriangulationModule {}
