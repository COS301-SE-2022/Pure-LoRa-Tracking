import { particleFilterMultinomialService, particleFilterRSSIMultinomialService } from '@lora/ai/particle-filter';
import { AiHeatmapAverageService } from '@lora/ai/average';
import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { testParamters, heatMapTestParameters } from './app.controller';
import { createObjectCsvWriter } from 'csv-writer';


interface csvObj {
  testName: string,
  numberOfSamples: number;
  processingTime: number;
  accuracy: number;
  readingLong: number;
  readingLat: number;
  estimateLong: number;
  estimateLat: number;
  noiseFactor: number;
}

@Injectable()
export class AppService {
  constructor(
    private locationService: LocationService,
    private serviceBus: ProcessingApiProcessingBusService
  ) {
    this.csvWriterObj = createObjectCsvWriter;
  }

  private csvWriterObj;
  private filepath = 'apps/tests/ai/results/';

  async processHeatmapAveragingTest(content: heatMapTestParameters) {
    const avgHeatMapInstances = new Array<{
      deviceId: string;
      heatmap: AiHeatmapAverageService;
      reading: {
        longitude: number;
        latitude: number;
      }[];
    }>();

    content.AvgPoints.forEach((reading) => {
      const heatMapInstance = new AiHeatmapAverageService(this.serviceBus);
      heatMapInstance.configureInitialParameters({ deviceID: reading.devID });
      avgHeatMapInstances.push({
        deviceId: reading.devID,
        heatmap: heatMapInstance,
        reading: reading.reading,
      });
    });

    const retObj = new Array<{
      processingTime: number;
      accuracy: number;
      EUID: string;
      result: number[];
    }>();

    avgHeatMapInstances.forEach((instance) => {
      let result, latestReading;
      const startTime = Date.now();
      instance.reading.forEach(async (readingEntry) => {
        latestReading = readingEntry;
        result = await instance.heatmap.processData({
          deviceID: instance.deviceId,
          reading: readingEntry,
        });
      });
      const endTime = Date.now();
      const procTime = (endTime - startTime) / 1000;
      const accuracy = this.distanceBetweenCoords(result, [
        latestReading.longitude,
        latestReading.latitude,
      ]);

      retObj.push({
        processingTime: procTime,
        accuracy: accuracy,
        EUID: instance.deviceId,
        result: result,
      });
    });

    for (let i = 0; i < avgHeatMapInstances.length; i++)
      delete avgHeatMapInstances[i].heatmap;

    return {
      status: 200,
      data: retObj,
    };
  }

  /********************************************************/

  async processParticleFilterTest(data: testParamters) {
    const linearTime = Date.now();
    const pfInstances = new Array<{
      name: string;
      pf: particleFilterRSSIMultinomialService;
      reading?: { latitude: number; longitude: number };
      rssiReading? : number[];
      samples: number;
      noiseFactor: number;
    }>();
    data.PFs.forEach((pf) => {
      pf.readings.forEach(reading => {
        const pfInst = new particleFilterRSSIMultinomialService(
          this.locationService,
          this.serviceBus
        );
        pfInst.configureInitialParameters({
          gateways: this.latlongObj(pf.gateways),
          reservePolygon: this.latlongObj(pf.perimeter),
          numberOfSamples: pf.numberOfParticles,
        });
        pfInstances.push({
          name: pf.name,
          pf: pfInst,
          reading: this.latlongObj([reading])[0],
          rssiReading: this.convertToRSSI(reading, pf.gateways),
          samples: pf.numberOfParticles,
          noiseFactor: pf.noiseFactor
        });
      })
    });

    /*const retObj = new Array<{
      processingTime: number;
      accuracy: number;
      name: string;
      samples: number;
      result: number[];
    }>();*/

    const csvData = new Array<csvObj>();
    for (let i = 0; i < pfInstances.length; i++) {
      const pf = pfInstances[i];
      const startTime = Date.now();
      const result = await pf.pf.particleFilter({...{rssi:pf.rssiReading}, ...pf.reading});
      const endTime = Date.now();
      const processingTime = (endTime - startTime) / 1000;
      const accuracy = this.distanceBetweenCoords(result, [
        pf.reading.longitude,
        pf.reading.latitude,
      ]);
      /*retObj.push({
        processingTime: processingTime,
        accuracy: accuracy,
        name: pf.name,
        result: result,
        samples: pf.samples
      });*/
      csvData.push({
        testName: pf.name,
        accuracy: accuracy,
        numberOfSamples: pf.samples,
        processingTime: processingTime,
        readingLong: pf.reading.longitude,
        readingLat: pf.reading.latitude,
        estimateLong: result[0],
        estimateLat: result[1],
        noiseFactor: pf.noiseFactor
      })
    }

    for (let i = 0; i < pfInstances.length; i++) delete pfInstances[i].pf;

    /**/

    const csvWriter = this.csvWriterObj({
      path: this.filepath + 'pfTests.csv',
      header: [
        { id: 'testName', title: 'Test Name' },
        { id: 'numberOfSamples', title: 'Number Of Samples' },
        { id: 'processingTime', title: 'Processing Time' },
        { id: 'accuracy', title: 'Accuracy' },
        { id: 'readingLong', title: 'Reading Longitude' },
        { id: 'readingLat', title: 'Reading Latitude' },
        { id: 'estimateLong', title: 'Estimate Longitude' },
        { id: 'estimateLat', title: 'Estimate Latitude' },
        { id: 'noiseFactor', title: 'Noise Factor' }
      ]
    });

    csvWriter
      .writeRecords(csvData)
      .then(() => console.log('The CSV file was written successfully'));
    /**/

    return {
      status: 200,
      linearTime: (Date.now() - linearTime) / 1000,
      //data: retObj,
      data: null
    };
  }

  /********************************************/

  latlongObj(numArr) {
    const ret = new Array<{ latitude: number; longitude: number }>();
    for (let i = 0; i < numArr.length; i++) {
      ret.push({ latitude: numArr[i][1], longitude: numArr[i][0] });
    }
    return ret;
  }

  distanceBetweenCoords(pointOne: number[], pointTwo: number[]): number {
    const p = 0.017453292519943295;
    const a =
      0.5 -
      Math.cos((pointTwo[0] - pointOne[0]) * p) / 2 +
      (Math.cos(pointOne[0] * p) *
        Math.cos(pointTwo[0] * p) *
        (1 - Math.cos((pointTwo[1] - pointOne[1]) * p))) /
      2;

    return 12742 * Math.sin(Math.sqrt(a)) * 1000;
  }

  convertToRSSI(reading, gateways) {
    const rssi = new Array<number>();
    gateways.forEach(gateway => {
        rssi.push(this.locationService.MetersToRSSI(this.distanceBetweenCoords(reading, gateway)))
    })
    return rssi;
  }
}
