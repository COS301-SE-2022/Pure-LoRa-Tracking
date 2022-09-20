import { particleFilterMultinomialService } from '@lora/ai/particle-filter';
import { AiProcessingStrategyModule, AiProcessingStrategyService } from '@lora/ai/strategy';
import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { testParamters } from './app.controller';

@Injectable()
export class AppService {
  constructor(private locationService: LocationService, private serviceBus: ProcessingApiProcessingBusService) {}

  processParticleFilterTest(data : testParamters) {
    const pfInstances = new Array<AiProcessingStrategyService>();
    data.PFs.forEach(pf => {
      const pfInst = new particleFilterMultinomialService(this.locationService, this.serviceBus);
      pfInst.configureInitialParameters()
    })
  }

  latlongObj(numArr : number[]) {
    const ret = new Array<{latitude:number, longitude:number}>();
    for (let i = 0; i < numArr.length; i+=2) {
      ret.push({latitude:numArr[i], longitude:numArr[i+1]})      
    }
    return ret;
  }
}
