import { Body, Controller, Get, Post } from '@nestjs/common';
import { any } from '@tensorflow/tfjs-node';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

export interface heatMapTestParameters {
  devID: string;
  reading: {
    longitude: number;
    latitude: number;
  };
}
