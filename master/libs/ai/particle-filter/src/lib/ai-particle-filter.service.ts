import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiParticleFilterService {

    constructor(private locationComputations: LocationService) { }

    private particleSampleSetLatLong: { latitude: number, longitude: number }[];
    private gatewayLocations: { latitude: number, longtitude: number }[];
    private weights: [number];
    private normMean = 0;
    private particleSampleSet: {x:number, y:number, z:number}[];

}
