import { Injectable, Logger } from '@nestjs/common';
import { AiHeatmapAverageService } from '@lora/ai/average';
import { AiMockGeneratorAveragingDataGeneratorService } from '@lora/ai/mock-generator/average';
import { ProcessingApiProcessingBusService } from '@processing/bus';

@Injectable()
export class AiMockDataTrainerService {
  constructor(private processingBus: ProcessingApiProcessingBusService){}
  private readonly logger = new Logger(AiMockDataTrainerService.name);
  private aiHeatMapService: AiHeatmapAverageService =
    new AiHeatmapAverageService(this.processingBus);
  private aiMockDataGenerator: AiMockGeneratorAveragingDataGeneratorService =
    new AiMockGeneratorAveragingDataGeneratorService();
  private nEntries = 5;
  private nFalsePoints = 10;
  private saveFilePath = 'file://libs/ai/Models/averaging';
  private loadFilePath = 'file://libs/ai/Models/averaging/model.json';

  //@Cron('45 * * * * *')
  async trainModel() {
    const loadComplete = await this.aiHeatMapService.loadModel(
      this.loadFilePath
    );

    if (!loadComplete) {
      console.log(
        '%c Failed to load from file. Building new model...',
        'color: red;'
      );
      this.aiHeatMapService.buildModel();
    } else {
      console.log('%c Load from file successful.', 'color: green;');
    }

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

    const saveSuccessful = await this.aiHeatMapService.saveModel(
      this.saveFilePath
    );

    if (!saveSuccessful) {
      console.log('%c Save unsuccessful.', 'color: red;');
    } else {
      console.log('%c Save successful.', 'color: green;');
    }

    const ToPredictData = this.aiHeatMapService.normalizePoints(
      this.aiHeatMapService.deconstructData(mock2[0].coordinates)
    );

    console.log(mock2[0].truePoint);
    console.log(await this.aiHeatMapService.predictData(ToPredictData));
  }
}
