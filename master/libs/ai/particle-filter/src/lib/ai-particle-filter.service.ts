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

    generatePolygonSamples(howMany: number) {
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
    }

    
    /* TODO add color parameter */
    printGeoJSONPoints(points:[number, number][]) {
        let sline = ''
        points.forEach((point:[number, number]) => {
            sline += ('{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": ['+point[0].toString()+','+point[1].toString()+']}},')
        })
        console.log(sline)
    }
}
