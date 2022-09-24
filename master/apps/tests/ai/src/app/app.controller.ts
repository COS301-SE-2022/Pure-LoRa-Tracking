import { Body, Controller, Get, Post } from '@nestjs/common';
import { any } from '@tensorflow/tfjs-node';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('hm')
  async processHeatmap(
    @Body() content: heatMapTestParameters
  ): Promise<{ status: number; data: any }> {
    return await this.appService.processHeatmapAveragingTest(content);
  }

  @Post('pf')
  async processPerimeter(
    @Body() content: testParamters
  ): Promise<{ status: number; data: any }> {
    return await this.appService.processParticleFilterTestV2(content);
  }
}

export interface PFprocessingParameters {
  perimeter: number[];
  gateways: number[];
  readings: number[][];
  trainingIterations: number;
  numberOfParticles: number;
  name: string;
  noiseFactor: number;
}

export interface testParamters {
  PFs: PFprocessingParameters[];
  numberOfTests: number;
}

export interface heatMapProcessingParameters {
  devID: string;
  reading: {
    longitude: number;
    latitude: number;
  }[];
  noiseFactor: number;
}

export interface heatMapTestParameters {
  AvgPoints: heatMapProcessingParameters[];
  processType?: string;
}
