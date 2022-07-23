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

    async buildModel() {
        // this.model = await tf.loadGraphModel('file://libs/ai/Models/averaging/Model.json').catch(error => {
        //     console.log(error);
        //     console.log("Returning new model\r\n")
        //     return tf.GraphModel()
        // })

        this.model = tf.sequential();
        this.model.add(tf.layers.dense({inputShape: [10], units: 8, activation:"relu", }));
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

    async fitModel(learningData, trueData) {
        await this.model.fit(learningData, trueData, {
            epochs : 5, 
            callbacks : {
                onEpochEnd: async (epoch, logs) => {
                    console.log("Epoch " + epoch);
                    console.log("Loss: " + logs.loss + " accuracy: " + logs.acc);
                  }
            }
        })
    }

    async getData(deviceID: string, startingIndex : number, endingIndex : number) {
        // TODO poll database for info
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
