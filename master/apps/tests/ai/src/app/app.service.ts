import { particleFilterMultinomialService } from '@lora/ai/particle-filter';
import { AiProcessingStrategyModule, AiProcessingStrategyService } from '@lora/ai/strategy';
import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { testParamters } from './app.controller';

@Injectable()
export class AppService {
  constructor(private locationService: LocationService, private serviceBus: ProcessingApiProcessingBusService) {}

  async processParticleFilterTest(data : testParamters) {
    const pfInstances = new Array<{name:string, pf:particleFilterMultinomialService, reading:{latitude:number, longitude:number}}>();
    data.PFs.forEach(pf => {
      const pfInst = new particleFilterMultinomialService(this.locationService, this.serviceBus);
      pfInst.configureInitialParameters({gateways:this.latlongObj(pf.gateways), reservePolygon:this.latlongObj(pf.perimeter), numberOfSamples:pf.numberOfParticles});
      pfInstances.push({name:pf.name,pf:pfInst, reading:this.latlongObj(pf.reading)[0]});
    });

    const retObj = new Array<{processingTime:number, accuracy:number[], name:string, result:number[]}>();
    for (let i = 0; i < pfInstances.length; i++) {
      const pf = pfInstances[i];
      const startTime = Date.now()/1000;
      const result = await pf.pf.particleFilter(pf.reading);
      const endTime = Date.now()/1000;
      const processingTime = (endTime-startTime);
      const accuracy = [
        Math.abs(((result[0] - pf.reading.longitude)*100 / pf.reading.longitude)),
        Math.abs((result[1] - pf.reading.latitude)*100 / pf.reading.latitude)
      ]
      retObj.push({processingTime:processingTime, accuracy:accuracy, name:pf.name, result:result})
    }

    return {
      status:200,
      data:retObj
  }

  }

  latlongObj(numArr : number[]) {
    const ret = new Array<{latitude:number, longitude:number}>();
    for (let i = 0; i < numArr.length; i++) {
      ret.push({latitude:numArr[i][1], longitude:numArr[i][0]})      
    }
    return ret;
  }
}
