import { Module, Global } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { AiHeatmapAverageService } from './ai-heatmap-average.service';

@Global()
@Module({
  imports: [ProcessingApiProcessingBusModule],
  controllers: [],
  providers: [AiHeatmapAverageService],
  exports: [AiHeatmapAverageService],
})
export class AiHeatmapAverageModule {}
