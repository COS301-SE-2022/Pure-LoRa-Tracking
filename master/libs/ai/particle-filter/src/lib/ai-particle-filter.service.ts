import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiParticleFilterService {

    constructor(private locationComputations: LocationService, initalParamters : {
        reservePolygon: {latitude:number, longitude:number}[],
        gateways : {latitude:number, longitude:number}[]
    }) {
        this.gatewayLocations = initalParamters.gateways;
        this.reservePolygon = initalParamters.reservePolygon;
     }

    private particles: { latitude: number, longitude: number }[];
    private gatewayLocations: { latitude: number, longitude: number }[];
    private weights: [number];
    private reservePolygon: { latitude: number, longitude: number }[];

    generatePolygonSamples(howMany:number) {
        return null;
    }

}
