import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import randomPositionInPolygon = require('random-position-in-polygon');
@Injectable()
export class AiParticleFilterService {

    /* considerations: 
        env file for config parameters? 
    */

    protected particles: number[][];
    private gatewayLocations: [number, number][];
    private reservePolygon: [number, number][];
    protected numberOfSamples: number;
    private numberOfSamplingIterations: number;
    private weights: number[];


    constructor(public locationComputations: LocationService) {
        this.reservePolygon = new Array<[number, number]>();
        this.gatewayLocations = new Array<[number, number]>();
        this.particles = new Array<number[]>();
        this.weights = new Array<number>();
    }

    configureInitialParameters(initialParameters: {
        reservePolygon: { latitude: number, longitude: number }[],
        gateways: { latitude: number, longitude: number }[],
        numberOfSamples: number,
    }) {
        initialParameters.gateways.forEach((gateway) => {
            this.gatewayLocations.push([gateway.longitude, gateway.latitude])
        })
        initialParameters.reservePolygon.forEach((location) => {
            this.reservePolygon.push([location.longitude, location.latitude]);
        })

        this.generatePolygonSamples(initialParameters.numberOfSamples)

        this.numberOfSamples = initialParameters.numberOfSamples;
        this.numberOfSamplingIterations = 40;

        this.resetWeights();
    }

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
    distanceBetweenCoords(pointOne: [number, number], pointTwo: [number, number]): number {
        const p = 0.017453292519943295;
        const a = 0.5 - Math.cos((pointTwo[0] - pointOne[0]) * p) / 2 + Math.cos(pointOne[0] * p) 
                  * Math.cos(pointTwo[0] * p) * (1 - Math.cos((pointTwo[1] - pointOne[1]) *p)) / 2;

        return 12742 * Math.sin(Math.sqrt(a)) * 1000;
    }

    /*
    the filter WILL NOT work without this method
    Mozilla gurantees uniform dist from Math.random
    */
    randomWalk(points = this.particles): number[][] {
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
    weightsMeasuredRelativeToOriginal(originalPoint: number[]): number[] {
        return null;
    }

    /*
    TODO Teddy
    This is going to form part of the template for the particle filter
    This method gives 1 / euclidean distance
    See weight distance euclidean in python
    default
    */
    weightDistanceEuclidean?(OriginalPoint: number[], RandomParticle: number[]): number {
        let sums = 0;
        
        for (let i = 0; i < OriginalPoint.length; i++){
            sums += (OriginalPoint[i] - RandomParticle[i])**2;
        }
        
        const divisor = Math.sqrt(sums);
        
        if (divisor < 0.000001){
            return 100000;
        }

        return 1 / divisor;
    }

    /* 
    TODO Teddy
    Make the weights array add up to one by dividing each entry by the total of the array
    */
    normalizeWeights() {

        // this.weights = normalized array 
        return null;
    }

    /*
    TODO Teddy
    Cumulative sum of normalized weights i.e. index i = the sum of indexes 0..i of normalized weights
    the last index should be 1 or approximately 1
    */ 
    cumulativeWeights() : number[] {
        return null;
    }
    
    /*
    find a library or algorithm to sample correctly for weighted point
    credit: https://www.30secondsofcode.org/js/s/weighted-sample
    */
    async generateNewSampleFromWeights(points = this.particles, weights = this.weights): Promise<number[][]> {
        if (points.length != weights.length)
            throw Error('Point and Weight dimension incorrect: P-' + points.length.toString() + ' W-' + weights.length.toString())

        let roll = 0;
        const newPoints = new Array<number[]>();
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
        this.particles = newPoints;
        return newPoints;
    };

    /* one line flex */
    predictParticleLocation(): number[] {
        return this.particles[this.weights.indexOf(Math.max(...this.weights))];
    }


    /*
    TODO Teddy
    compute degeneracy, 
    1 / var(W) == 1 / sum of (each weight squared)
    see python
    */
    computeDegeneracy(): number {
        return null;
    }

    resampleParticles?(howMany?: number) {
        const newParticles = new Array<number[]>()
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

        for (let i = 0; i < howMany && i < this.numberOfSamples; i++) {
            newParticles.push(randomPositionInPolygon(polygon))
        }

        for (let i = howMany; i < this.numberOfSamples; i++) {
            newParticles.push(this.particles[i])
        }
        this.particles = newParticles;
    }

    resetWeights() {
        for (let i = 0; i < this.numberOfSamples; i++) {
            this.weights[i] = 1 / this.numberOfSamples;
        }
    }

    /*
    to be extended into template 
    */
    async particleFilter(reading: { latitude: number, longitude: number }): Promise<number[]> {
        const readingPoint = [reading.longitude, reading.latitude];

        // random walk
        this.randomWalk();

        // train to point
        for (let i = 0; i < this.numberOfSamplingIterations; i++) {

            // perform measurement and set weighting
            this.weightsMeasuredRelativeToOriginal(readingPoint);

            // normalize weights
            this.normalizeWeights();

            // compute degeneracy
            const degeneracy = this.computeDegeneracy();

            // check for sample reset
            if (degeneracy < this.numberOfSamples / 4) {

                // throw Error("Liam please test");
                // reset sample by resampling methods
                this.resampleParticles(Math.floor(this.numberOfSamples / 8))

                // reset weights after complete resample
                this.resetWeights()

            } else {
                // resample by weights
                await this.generateNewSampleFromWeights()
            }
        }
        return this.predictParticleLocation();
    }
}

@Injectable()
export class particleFilterStratifiedService extends AiParticleFilterService {
    constructor(locationComputations: LocationService) {
        super(locationComputations);
    }

    // consider : https://github.com/stdlib-js/random-base-uniform
    resampleParticles(howMany?: number): void {
        const cdf = this.cumulativeWeights();
        const newParticles = new Array<number[]>();

        let n = 0;
        let m = 1;

        while(n < this.numberOfSamples) {
            const u0 = Math.random() * (((1/this.numberOfSamples)+0.000000000001) - 0.000000000001) + 0.000000000001;
            const u = u0 + 1 / this.numberOfSamples;

            while(cdf[m]<u) {
                m += 1
            }
            n += 1
            newParticles.push(this.particles[m])
        }
        this.particles = newParticles;
    }
}

@Injectable()
export class particleFilterMultinomialService extends AiParticleFilterService {
    constructor(locationComputations: LocationService) {
        super(locationComputations);
    }

    // consider : https://github.com/stdlib-js/random-base-uniform
    resampleParticles(howMany?: number): void {
        const cdf = this.cumulativeWeights();
        const newParticles = new Array<number[]>();

        let n = 0;

        while(n < this.numberOfSamples) {
            const u = Math.random() * ((1+0.000000000001) - 0.000000000001) + 0.000000000001;
            let m = 1;

            while(cdf[m]<u) {
                m += 1
            }
            n += 1
            newParticles.push(this.particles[m])
        }
        this.particles = newParticles;
    }
}
