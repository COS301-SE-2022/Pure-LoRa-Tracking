import { Injectable } from '@nestjs/common';
import { LocationService } from '@lora/location'

@Injectable()
export class AiMockGeneratorTriangulationService {

    constructor(private locationService: LocationService) { }

    // setGatewayList(gateways: { latitude: number, longitude: number }[]) {
    //     this.gatewayLocations = gateways;
    // }

    randomSensor(gatewaySubset: { latitude: number, longitude: number }[]): { latitude: number, longitude: number } {
        const r1 = Math.random();
        const r2 = Math.random();

        const latitude = (1 - Math.sqrt(r1)) * gatewaySubset[0].longitude + (Math.sqrt(r1) * (1 - r2)) * gatewaySubset[1].longitude + (Math.sqrt(r1) * r2) * gatewaySubset[2].longitude;
        const longitude = (1 - Math.sqrt(r1)) * gatewaySubset[0].latitude + (Math.sqrt(r1) * (1 - r2)) * gatewaySubset[1].latitude + (Math.sqrt(r1) * r2) * gatewaySubset[2].latitude;

        return {
            longitude: latitude,
            latitude: longitude
        }
    }

    generateRSSIlist(sensorPoint: { latitude: number, longitude: number }, gatewaySubset: { latitude: number, longitude: number }[]): number[] {
        const MeterDiffRSSI = new Array<number>();
        for (let i = 0; i < gatewaySubset.length; i++) {
            const gateway = gatewaySubset[i];
            MeterDiffRSSI.push(this.locationService.MetersToRSSI(this.locationService.distanceInMeters(sensorPoint.latitude, sensorPoint.longitude, gateway.latitude, gateway.longitude)));
        }
        return MeterDiffRSSI;
    }

    generateBatches(gateways: { latitude: number, longitude: number }[], numberOfBatches:number) : {gateways:{latitude:number, longitude:number}[], sensors:{latitude:number, longitude:number}[], rssi:number[][]} {
        if(gateways.length < 3)
        throw Error("Not enough gateways")

        const sensors = new Array<{latitude:number, longitude:number}>();
        const rssi = new Array<number[]>();

        for (let i = 0; i < numberOfBatches; i++) {
            sensors.push(this.randomSensor(gateways));
            rssi.push(this.generateRSSIlist(sensors[i], gateways))
        }
        return {
            gateways : gateways,
            sensors : sensors,
            rssi : rssi
        }
    }
}
