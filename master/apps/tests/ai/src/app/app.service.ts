import { particleFilterMultinomialService } from '@lora/ai/particle-filter';
import { AiHeatmapAverageService } from '@lora/ai/average';
import {
  AiProcessingStrategyModule,
  AiProcessingStrategyService,
} from '@lora/ai/strategy';
import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { testParamters, heatMapTestParameters } from './app.controller';

@Injectable()
export class AppService {
  constructor(
    private locationService: LocationService,
    private serviceBus: ProcessingApiProcessingBusService
  ) { }

  async processHeatmapAveragingTest(content: heatMapTestParameters) {
    const avgHeatMapInstances = new Array<{
      deviceId: string;
      heatmap: AiHeatmapAverageService;
      reading: {
        longitude: number;
        latitude: number;
      };
    }>();
    const existingHeatmapsForDevID = [];
    content.AvgPoints.forEach((reading) => {
      if (!existingHeatmapsForDevID.includes(reading.devID)) {
        const heatMapInstance = new AiHeatmapAverageService(this.serviceBus);
        heatMapInstance.configureInitialParameters({ deviceID: reading.devID });
        existingHeatmapsForDevID.push(reading.devID);
      }
    });
  }

  async processParticleFilterTest(data: testParamters) {
    const linearTime = Date.now();
    const pfInstances = new Array<{ name: string, pf: particleFilterMultinomialService, reading: { latitude: number, longitude: number } }>();
    data.PFs.forEach(pf => {
      const pfInst = new particleFilterMultinomialService(this.locationService, this.serviceBus);
      pfInst.configureInitialParameters({ gateways: this.latlongObj(pf.gateways), reservePolygon: this.latlongObj(pf.perimeter), numberOfSamples: pf.numberOfParticles });
      pfInstances.push({ name: pf.name, pf: pfInst, reading: this.latlongObj(pf.reading)[0] });
    });

    const retObj = new Array<{ processingTime: number, accuracy: number, name: string, result: number[] }>();
    for (let i = 0; i < pfInstances.length; i++) {
      const pf = pfInstances[i];
      const startTime = Date.now();
      const result = await pf.pf.particleFilter(pf.reading);
      const endTime = Date.now();
      const processingTime = (endTime - startTime) / 1000;
      const accuracy =
        this.distanceBetweenCoords(result, [pf.reading.longitude, pf.reading.latitude])
      retObj.push({ processingTime: processingTime, accuracy: accuracy, name: pf.name, result: result })
    }

    for (let i = 0; i < pfInstances.length; i++)
      delete pfInstances[i].pf;

    return {
      status: 200,
      linearTime: (Date.now() - linearTime) / 1000,
      data: retObj
    }

  }

  /********************************************/

  latlongObj(numArr: number[]) {
    const ret = new Array<{ latitude: number, longitude: number }>();
    for (let i = 0; i < numArr.length; i++) {
      ret.push({ latitude: numArr[i][1], longitude: numArr[i][0] });
    }
    return ret;
  }

  distanceBetweenCoords(pointOne: number[], pointTwo: number[]): number {
    const p = 0.017453292519943295;
    const a = 0.5 - Math.cos((pointTwo[0] - pointOne[0]) * p) / 2 + Math.cos(pointOne[0] * p)
      * Math.cos(pointTwo[0] * p) * (1 - Math.cos((pointTwo[1] - pointOne[1]) * p)) / 2;

    return 12742 * Math.sin(Math.sqrt(a)) * 1000;
  }
}
