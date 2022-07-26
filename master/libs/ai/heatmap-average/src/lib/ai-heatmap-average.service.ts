import { Injectable } from '@nestjs/common';
import tf = require('@tensorflow/tfjs-node');

@Injectable()
export class AiHeatmapAverageService {
    private EarthRadius = 6371;
    private model: tf.Sequential;

    /*
        1) get model
        2) build dataset
        3) train
        4) store result
    */

    constructor() {
        this.buildModel();
    }

    normalizePoints(dataSet: number[]) : number[] {
        const toRet = new Array<number>();
        dataSet.forEach(item => {
            if(dataSet.indexOf(item) % 2 == 0)
            toRet.push( (item + 200)  / 400 )
            else toRet.push((item + 100) / 200)
        })
        return toRet
    }

    deNormalizePoints(dataSet: number[]) : number[] {
        return [dataSet[0]*400 -200, dataSet[1]*200 -100];
    }

    deconstructData(data: any[]) {
        const toRet = new Array<number>();
        data.forEach(element => {
            toRet.push(element.latitude);
            toRet.push(element.longitude);
        });
        return toRet;
    }

    async buildModel() {
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({inputShape: [20], units: 8, activation:"sigmoid", }));
        this.model.add((tf.layers.dense({units:2, activation: 'softmax'})));
        this.model.compile({
            optimizer: 'sgd',
            loss: 'meanAbsoluteError',
            metrics: ['accuracy']
        })
    }

    async saveModel(): Promise<boolean> {
        const res = await this.model.save('file://libs/ai/Models/averaging')
        if (res.errors != undefined)
            return false;
        return true;
    }

    /*
        load model from file
    */

    async fitModel(learningData, trueData) {
        await this.model.fit(tf.tensor(learningData, [1,20]), tf.tensor(trueData, [1,2]), {
            epochs : 5, 
            callbacks : {
                onEpochEnd: async (epoch, logs) => {
                    console.log("Epoch " + epoch);
                    console.log("Loss: " + logs.loss + " accuracy: " + logs.acc);
                  },
                onTrainEnd: async(logs : tf.Logs) => {
                    console.log(logs)
                }
            }
        })
    }

    async predictData(inputData)  {
        return this.deNormalizePoints((await (this.model.predict(tf.tensor(inputData, [1,20])) as tf.Tensor).array() as number[][])[0]);
    }

    LatLongToGeometric(latitude: number, longitude: number): { x: number, y: number, z: number } {
        return {
            x: Math.cos(latitude) * Math.cos(longitude),
            y: Math.cos(latitude) * Math.sin(longitude),
            z: Math.sin(latitude)
        }
    }

    GeometricAverage(GeomSet: { x: number, y: number, z: number }[]): { x: number, y: number, z: number } {
        let Xtot: number, Ytot: number, Ztot: number;
        Xtot = 0;
        Ytot = 0;
        Ztot = 0;
        GeomSet.forEach(item => {
            Xtot += item.x;
            Ytot += item.y;
            Ztot += item.z;
        })

        return {
            x: Xtot / GeomSet.length,
            y: Ytot / GeomSet.length,
            z: Ztot / GeomSet.length
        }
    }

    GeometricToLatLong(GeomSet: { x: number, y: number, z: number }): { latitude: number, longitude: number } {
        const hyp = Math.sqrt(GeomSet.x * GeomSet.x + GeomSet.y * GeomSet.y);
        return {
            longitude: Math.atan2(GeomSet.y, GeomSet.x),
            latitude: Math.atan2(GeomSet.z, hyp)
        }
    }
}
