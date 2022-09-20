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
    return await this.appService.processParticleFilterTest(content);
  }
}

export interface PFprocessingParameters {
  perimeter: number[];
  gateways: number[];
  reading: number[];
  trainingIterations: number;
  numberOfParticles: number;
  name: string;
}

export interface testParamters {
  PFs: PFprocessingParameters[];
  NNs: null;
}

export interface heatMapProcessingParameters {
  devID: string;
  reading: {
    longitude: number;
    latitude: number;
  }[];
}

export interface heatMapTestParameters {
  AvgPoints: heatMapProcessingParameters[];
}
