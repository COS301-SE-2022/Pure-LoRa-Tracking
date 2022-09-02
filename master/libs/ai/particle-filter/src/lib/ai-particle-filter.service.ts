import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiParticleFilterService {

    constructor(private locationComputations: LocationService) { }

    private particleSampleSetLatLong: { latitude: number, longitude: number }[];
    private gatewayLocations: { latitude: number, longtitude: number }[];
    private weights: [number];
    private normMean = 0;
    private particleSampleSet: {x:number, y:number, z:number};

    // u could be considered the rssi of the device...?
    // use the rssi to  get an approximate next location and use the diff in location as u...?

    // how does one sample from the normal distribution based on this data. how is the mean used?

    // how do I compute a weight in this context? The weight is strongest relative to the real reading...?

    // how do I draw from the sample using the weights? how do i generate a distribution and pull from it?

    // how do I simulate noise? random walk?

    // still need to consider degenracy, weight balancing and optimization of sample halving, possibly clear half back to uniform at each stage for convergance

    
    /*
    convert samples to x,y,z format
    */
   convertLatLongToXYZ() {
    return null;//this.locationComputations.GeodeticToECEF()
   }

    /*
    gateway locations for measurement model
    */
    setGateways(gatewayLocations: { latitude: number, longtitude: number }[]): void { this.gatewayLocations = gatewayLocations };

    /*
    A function to represent the measurement model
    euclidean distances of sample to gateway
    */
    measureSamples(samples: { latitude: number, longitude: number }[]): { euclideanDistances: { one: number, two: number, three: number } }[] { return null };

    /*
     a function to represent the process model
     models the movement from xk-1 to xk through sensor info -> rssi
    */
    processModel(stateOld: { x: number, y: number, z: number }): { stateNew: { x: number, y: number, z: number } } { return null }

    /*
    generate initial distribution with initial weights 
    and locations all uniformly distributed
    */
    generateInitialDistribution() {
        return null;
    }

    /*
    sample from the normal distribution given mean and variance paramters
    */
    sampleNormal(mean:number, variance:number) {return null;}

    /*
    sample device based on weight
    */

    /*
    save data  to txt file
    */
    saveDataToFile(filename: string) { return null; }

    /*
    reload data
    */
    loadDataFile(filename: string) { return null; }

    /*
    version 1 (no optimizations/ no noise additions with degeneracy existent)
    Given:
        a list of particles n, their positions and their weights, 
        the action the real particle makes to be applied to each particle, 
        measurement model and past results
    
    Algorithm:
        loop 1..n
            sample a particle index [j] from the given set by weight given the zero mean and normal distribution
            sample a new particle using the old particle[j] and the action applied to that particle, 
            reweight the particle based on based on the probability of the sampled location being correct
            normalize the weights such that the sum is 1
    */
    particleFilterAlgorithm_v1() {
        return null;
    }

}
