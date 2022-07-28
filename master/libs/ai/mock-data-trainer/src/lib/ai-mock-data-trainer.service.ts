import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AiHeatmapAverageService } from '@lora/ai/average';
import { AiMockGeneratorAveragingDataGeneratorService } from '@lora/ai/mock-generator/average';

@Injectable()
export class AiMockDataTrainerService {
  private readonly logger = new Logger(AiMockDataTrainerService.name);
  private aiHeatMapService: AiHeatmapAverageService =
    new AiHeatmapAverageService();
  private aiMockDataGenerator: AiMockGeneratorAveragingDataGeneratorService =
    new AiMockGeneratorAveragingDataGeneratorService();
  private nEntries = 10;
  private nFalsePoints = 10;

  @Cron('45 * * * * *')
  async trainModel() {
    await this.aiHeatMapService.loadModel();
    const learning = this.aiMockDataGenerator.generateData(
      this.nEntries,
      this.nFalsePoints
    );

    const mock2 = this.aiMockDataGenerator.generateData(1, this.nFalsePoints);
    for (let a = 0; a < this.nEntries; a++) {
      const learn = this.aiHeatMapService.normalizePoints(
        this.aiHeatMapService.deconstructData(learning[a].coordinates)
      );
      const train = this.aiHeatMapService.normalizePoints(
        this.aiHeatMapService.deconstructData([learning[a].truePoint])
      );
      await this.aiHeatMapService.fitModel(learn, train);
    }
    await this.aiHeatMapService.saveModel();

    const ToPredictData = this.aiHeatMapService.normalizePoints(
      this.aiHeatMapService.deconstructData(mock2[0].coordinates)
    );

    console.log(mock2[0].truePoint);
    console.log(await this.aiHeatMapService.predictData(ToPredictData));
  }
}
