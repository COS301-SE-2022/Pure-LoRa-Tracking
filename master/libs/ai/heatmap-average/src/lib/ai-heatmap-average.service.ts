import { AiProcessingStrategyService } from '@lora/ai/strategy';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import tf = require('@tensorflow/tfjs-node');

@Injectable()
export class AiHeatmapAverageService extends AiProcessingStrategyService {
  private EarthRadius = 6371;
  private model: tf.Sequential;
  private targetEpochs = 5;
  private loadFilePath: string;
  private saveFilePath: string;
  private deviceToken: string;
  private defaultModelLoadPath = 'file://libs/ai/Models/averaging/';
  private currentFive: { latitude: number; longitude: number }[];

  /*
        1) get model
        2) build dataset
        3) train
        4) store result
  */

  constructor(protected serviceBus: ProcessingApiProcessingBusService) {
    super(serviceBus);
    this.buildModel();
    this.loadFilePath = ``;
    this.saveFilePath = ``;
    this.currentFive = new Array<{ latitude: number; longitude: number }>();
  }

  async configureInitialParameters(initialParameters: { deviceID: string }) {
    this.deviceToken = initialParameters.deviceID;
    this.saveFilePath = `file://libs/ai/Models/averaging/${initialParameters.deviceID}/`;
    this.loadFilePath = this.saveFilePath + 'model.json';
    const isPrevModel = await this.loadModel(this.loadFilePath);

    //No model for current device.
    if (!isPrevModel) {
      await this.loadModel(this.defaultModelLoadPath);
    }
  }

  /*
    1) Load model by device name
    2) Receive reading and push to rolling array
    3) Normalize
    4) Train
    5) Predict
    6) Denormalize
    7) Send result to TB via bus
  */
  async processData(
    data: {
      deviceID: string;
      reading: { latitude: number; longitude: number };
    },
    procType?: string
  ): Promise<number[]> {
    if (this.currentFive.length >= 5) this.currentFive.shift();

    this.currentFive.push(data.reading);

    if (this.currentFive.length != 5) return [];

    if (procType == undefined || procType != 'ANN') {
      const result = this.calculateAverageCoodirnateComputationally(
        this.currentFive
      );
      return [result.longitude, result.latitude];
    }

    const normalizedFive = this.normalizePoints(
      this.deconstructData(this.currentFive)
    );
    const normalizedReading = this.normalizePoints(
      this.deconstructData([data.reading])
    );

    this.fitModel(normalizedFive, normalizedReading);
    const result = await this.predictData(normalizedFive);

    this.serviceBus.sendProcessedDatatoTB(this.deviceToken, {
      processingType: 'ANN',
      result: { longitude: result[0], latitude: result[1] },
    });

    this.saveModel(this.saveFilePath);

    return result;
  }

  calculateAverageCoodirnateComputationally(
    points: { latitude: number; longitude: number }[]
  ): { latitude: number; longitude: number } {
    let x = 0,
      y = 0,
      z = 0;

    for (let i = 0; i < points.length; i++) {
      const longitude = (points[i].longitude * Math.PI) / 180;
      const latitude = (points[i].latitude * Math.PI) / 180;
      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    x /= points.length;
    y /= points.length;
    z /= points.length;
    const centralLongitude = (Math.atan2(y, x) * 180) / Math.PI;
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = (Math.atan2(z, centralSquareRoot) * 180) / Math.PI;

    return {
      longitude: centralLongitude,
      latitude: centralLatitude,
    };
  }

  normalizePoints(dataSet: number[]): number[] {
    const toRet = new Array<number>();
    dataSet.forEach((item) => {
      if (dataSet.indexOf(item) % 2 == 0) toRet.push((item + 200) / 400);
      else toRet.push((item + 100) / 200);
    });
    return toRet;
  }

  deNormalizePoints(dataSet: number[]): number[] {
    return [dataSet[0] * 400 - 200, dataSet[1] * 200 - 100];
  }

  deconstructData(data: any[]) {
    const toRet = new Array<number>();
    data.forEach((element) => {
      toRet.push(element.latitude);
      toRet.push(element.longitude);
    });
    return toRet;
  }

  async buildModel() {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({ inputShape: [10], units: 8, activation: 'sigmoid' })
    );
    this.model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
    this.model.compile({
      optimizer: 'sgd',
      loss: 'meanAbsoluteError',
      metrics: ['accuracy'],
    });
  }

  async saveModel(filePath: string): Promise<boolean> {
    const res = await this.model.save(filePath); //'file://libs/ai/Models/averaging');
    if (res.errors != undefined) return false;
    return true;
  }

  async loadModel(filePath: string): Promise<boolean> {
    const res = await tf
      .loadLayersModel(filePath) //'file://libs/ai/Models/averaging/model.json')
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });

    return res;
  }

  async fitModel(learningData, trueData) {
    await this.model.fit(
      tf.tensor(learningData, [1, 10]),
      tf.tensor(trueData, [1, 2]),
      {
        epochs: this.targetEpochs,
        verbose: 0,
        /*callbacks: {
          onEpochEnd: async (epoch, logs) => {
            console.log('Epoch ' + epoch);
            console.log('Loss: ' + logs.loss + ' accuracy: ' + logs.acc);
          },
          onTrainEnd: async (logs: tf.Logs) => {
            console.log(logs);
          },
        },*/
      }
    );
  }

  async predictData(inputData) {
    return this.deNormalizePoints(
      (
        (await (
          this.model.predict(tf.tensor(inputData, [1, 10])) as tf.Tensor
        ).array()) as number[][]
      )[0]
    );
  }

  LatLongToGeometric(
    latitude: number,
    longitude: number
  ): { x: number; y: number; z: number } {
    return {
      x: Math.cos(latitude) * Math.cos(longitude),
      y: Math.cos(latitude) * Math.sin(longitude),
      z: Math.sin(latitude),
    };
  }

  GeometricAverage(GeomSet: { x: number; y: number; z: number }[]): {
    x: number;
    y: number;
    z: number;
  } {
    let Xtot: number, Ytot: number, Ztot: number;
    Xtot = 0;
    Ytot = 0;
    Ztot = 0;
    GeomSet.forEach((item) => {
      Xtot += item.x;
      Ytot += item.y;
      Ztot += item.z;
    });

    return {
      x: Xtot / GeomSet.length,
      y: Ytot / GeomSet.length,
      z: Ztot / GeomSet.length,
    };
  }

  GeometricToLatLong(GeomSet: { x: number; y: number; z: number }): {
    latitude: number;
    longitude: number;
  } {
    const hyp = Math.sqrt(GeomSet.x * GeomSet.x + GeomSet.y * GeomSet.y);
    return {
      longitude: Math.atan2(GeomSet.y, GeomSet.x),
      latitude: Math.atan2(GeomSet.z, hyp),
    };
  }
}
