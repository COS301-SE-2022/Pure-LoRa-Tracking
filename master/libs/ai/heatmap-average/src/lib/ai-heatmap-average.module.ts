import { Module, Global } from '@nestjs/common';
import { AiHeatmapAverageService } from './ai-heatmap-average.service';

@Global()
@Module({
  controllers: [],
  providers: [AiHeatmapAverageService],
  exports: [AiHeatmapAverageService],
})
export class AiHeatmapAverageModule {}
