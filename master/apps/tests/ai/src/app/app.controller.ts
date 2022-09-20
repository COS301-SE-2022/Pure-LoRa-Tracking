import { Body, Controller, Get, Post } from '@nestjs/common';
import { any } from '@tensorflow/tfjs-node';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('pf')
  processPerimeter(@Body() content : testParamters) {this.appService.processParticleFilterTest(content)};
}

export interface PFprocessingParameters {
  perimeter : number[],
  gateways : number[],
  reading : number[],
  trainingIterations: number,
  numberOfParticles: number,
  name : string
}

export interface testParamters {
  PFs : PFprocessingParameters[],
  NNs : null
}
