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
  private nEntries = 30;
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
      await this.aiHeatMapService.buildModel();
    } else {
      console.log('%c Load from file successful.', 'color: green;');
    }

    const learning = [];
    for (let i = 0; i < this.nEntries; i++) {
      learning.push(
        this.aiMockDataGenerator.generateData(
          1,
          Math.random() * (10 - 3) + 3
        )[0]
      );
    }

    const mock2 = this.aiMockDataGenerator.generateData(
      1,
      Math.random() * (10 - 3) + 3
    );
    const learn = [];
    const train = [];
    for (let a = 0; a < this.nEntries; a++) {
      learn.push(
        this.aiHeatMapService.normalizePoints(
          this.aiHeatMapService.deconstructData(await learning[a].coordinates)
        )
      );
      train.push(
        this.aiHeatMapService.normalizePoints(
          this.aiHeatMapService.deconstructData([learning[a].truePoint])
        )
      );
    }

    await this.aiHeatMapService.fitModel(learn, train, this.nEntries);

    const saveSuccessful = await this.aiHeatMapService.saveModel(
      this.saveFilePath
    );

    if (!saveSuccessful) {
      console.log('%c Save unsuccessful.', 'color: red;');
    } else {
      console.log('%c Save successful.', 'color: green;');
    }

    const ToPredictData = this.aiHeatMapService.normalizePoints(
      this.aiHeatMapService.deconstructData(await mock2[0].coordinates)
    );

    const predicted = await this.aiHeatMapService.predictData(ToPredictData);
    console.log(predicted);
  }
}
