import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import randomPositionInPolygon = require('random-position-in-polygon');
@Injectable()
export class AiParticleFilterService {

    /* considerations: 
        env file for config parameters? 
    */

    constructor(private locationComputations: LocationService) {
        this.reservePolygon = new Array<[number, number]>();
        this.gatewayLocations = new Array<[number, number]>();
        this.particles = new Array<[number, number]>();
    }

    addInitialParamters(initialParameters: {
        reservePolygon: { latitude: number, longitude: number }[],
        gateways: { latitude: number, longitude: number }[]
    }) {
        initialParameters.gateways.forEach((gateway) => {
            this.gatewayLocations.push([gateway.longitude, gateway.latitude])
        })
        initialParameters.reservePolygon.forEach((location) => {
            this.reservePolygon.push([location.longitude, location.latitude]);
        })
    }

    private particles: [number, number][];
    private gatewayLocations: [number, number][];
    private weights: [number];
    private reservePolygon: [number, number][];

    generatePolygonSamples(howMany: number): boolean {
        const polygon = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: "Polygon",
                "coordinates": [
                    this.reservePolygon
                ]
            }
        }
        for (let i = 0; i < howMany; i++) {
            this.particles.push(randomPositionInPolygon(polygon))
        }
        return true;
    }


    /* TODO add color parameter */
    printGeoJSONPoints(points: [number, number][]) {
        let sline = ''
        points.forEach((point: [number, number]) => {
            sline += ('{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [' + point[0].toString() + ',' + point[1].toString() + ']}},')
        })
        console.log(sline)
    }

    /* 
    TODO Teddy 
    See python code for method, final distance should be in meters
    write code here for 1-2 commits, write test for 1 commit
    */
    distanceBetweenCoords(pointOne: [number, number], pointTwo: [number, number]): [number] {
        return null;
    }

    /*
    TODO Liam
    the filter WILL NOT work without this method

    Mozilla gurantees uniform dist from Math.random
    */
    randomWalk(points: [number, number][]): [number, number][] {
        const newPoints = new Array<[number, number]>();
        points.forEach(point => {

            const randOne = Math.random() * (0.001 - 0.0001) + 0.0001;
            const randTwo = Math.random() * (0.001 - 0.0001) + 0.0001;
            const choice = Math.floor(Math.random() * (4 - 0) + 0);

            switch (choice) {
                case 0:
                    newPoints.push([point[0] + randOne, point[1] + randTwo])
                    break;
                case 1:
                    newPoints.push([point[0] + randOne, point[1] - randTwo])
                    break;
                case 2:
                    newPoints.push([point[0] - randOne, point[1] + randTwo])
                    break;
                default:
                    newPoints.push([point[0] - randOne, point[1] - randTwo])
                    break;
            }
        })
        return newPoints;
    }


    /*
    TODO Teddy
    please be thorough, this method is crucial
    */
    weightsMeasuredRelativeToOriginal(): [number] {
        return null;
    }

    /*
    TODO Teddy
    This is going to form part of the template for the particle filter
    This method gives 1 / euclidean distance
    See weight distance euclidean in python
    */
    weightDistanceEuclidean(OriginalPoint: [number], RandomParticle: [number]): number {
        return null;
    }

    /* 
    TODO Teddy
    Make the weights array add up to one by dividing each entry by the total of the array
    */
    normalizeWeights(weights: [number]): [number] {
        return null;
    }

    /*
    TODO Liam
    find a library or algorithm to sample correctly for weighted point
    credit: https://www.30secondsofcode.org/js/s/weighted-sample
    */
    async generateNewSampleFromWeights(points, weights: number[]): Promise<[number, number][]> {
        let roll = 0;
        const newPoints = new Array<[number, number]>();
        while (newPoints.length != weights.length) {
            roll = Math.random();
            newPoints.push(points[
                weights
                    .reduce(
                        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
                        []
                    )
                    .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
            ]);
        }
        //this.printGeoJSONPoints(points);
        //this.printGeoJSONPoints(newPoints);
        return newPoints;
    };


    /*
    TODO Teddy
    compute degeneracy, 
    1 / var(W) == 1 / sum of each weight squared
    see python
    */
    computeDegeneracy(weights: [number]): number {
        return null;
    }

    /*
    TODO Liam
    resampling techniques
    */


    /*
    TODO Liam
    */
    particleFilter(): [number, number] {
        return null;
    }



}
