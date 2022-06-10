import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';

@Injectable()
export class LocationService {
    constructor (private tbClient: ThingsboardThingsboardClientService) {}

    calculateLocation(gatewayData: UplinkRXInfo[], thingsBoardDeviceToken: string) {
        
        
        // function degreesToRad(degrees: number) {
        //     return degrees * Math.PI / 180;
        // };  
        
        // Helper function to calculate the distance in meter between two coordinates
        // function coordinateDistanceMeter(latA: number, lonA: number, latB: number, lonB: number) {
            
            
        //     const dLat = degreesToRad(latB-latA);
        //     const dLon = degreesToRad(lonB-lonA);
            
        //     latA = degreesToRad(latA);
        //     latB = degreesToRad(latB);
            
        //     const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latA) * Math.cos(latB); 
        //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        //     return EARTH_RAD * c;
        // }
        const BASE_FACTOR = -61.1;
        const ENV_FACTOR = 2;

        function rssiToMeters(rssi: number) {
            if (rssi > BASE_FACTOR) 
                return Math.pow(10,((BASE_FACTOR - rssi) / 10 * ENV_FACTOR))
            else
                return Math.pow(10,((BASE_FACTOR) / 10 * ENV_FACTOR))
        }
        // -25.82198978570606, 28.33657264709473
        // -25.822120162959596, 28.33628833293915
        // console.log('RSSI: '+gatewayData[0].getRssi()+'  '+gatewayData[0].getTime().toDate().toISOString());
        // console.log(gatewayData[0].getLocation());
        // Only handle triangulatable data
        gatewayData = gatewayData.filter(gateway => 
            gateway.hasLocation() == true &&
            gateway.getLocation().getLatitude() != 0 &&
            gateway.getLocation().getLongitude() != 0
        );
        if (gatewayData.length < 3) return;

        // Arrange by signal strength (distance from sensor)
        gatewayData.sort((a,b) => {
            return a.getRssi()-b.getRssi();
        })
        
        const EARTH_RADIUS = 6378137.0;
        // calculate distance from RSSI
        
        const len1Degrees = rssiToMeters(gatewayData[0].getRssi()) / EARTH_RADIUS;
        const len2Degrees = rssiToMeters(gatewayData[1].getRssi()) / EARTH_RADIUS;
        const len3Degrees = rssiToMeters(gatewayData[2].getRssi()) / EARTH_RADIUS;

        const gateway1Location = gatewayData[0].getLocation();
        const gateway2Location = gatewayData[1].getLocation();
        const gateway3Location = gatewayData[2].getLocation();

        const a = gateway1Location.getLatitude();
        const b = gateway1Location.getLongitude();
        const c = gateway2Location.getLatitude();
        const d = gateway2Location.getLongitude();

        const l = len1Degrees;
        const g = len2Degrees;
        
        // calculates our x
        let x = +((4*a**3-4*a**2*d-Math.sqrt(Math.abs((-4*a**3+4*a**2*d-4*a*b**2+8*a*b*c-4*a*c**2+4*a*d**2-4*a*g**2+4*a*l**2-4*b**2*d+8*b*c*d-4*c**2*d-4*d**3+4*d*g**2-4*d*l**2)**2-4*(4*a**2-8*a*d+4*b**2-8*b*c+4*c**2+4*d**2)*(a**4+2*a**2*b**2-4*a**2*b*c+2*a**2*c**2-2*a**2*d**2+2*a**2*g**2-2*a**2*l**2+b**4-4*b**3*c+6*b**2*c**2+2*b**2*d**2-2*b**2*g**2-2*b**2*l**2-4*b*c**3-4*b*c*d**2+4*b*c*g**2+4*b*c*l**2+c**4+2*c**2*d**2-2*c**2*g**2-2*c**2*l**2+d**4-2*d**2*g**2+2*d**2*l**2+g**4-2*g**2*l**2+l**4)))+4*a*b**2-8*a*b*c+4*a*c**2-4*a*d**2+4*a*g**2-4*a*l**2+4*b**2*d-8*b*c*d+4*c**2*d+4*d**3-4*d*g**2+4*d*l**2)/(2*(4*a**2-8*a*d+4*b**2-8*b*c+4*c**2+4*d**2))).toFixed(15);
        if (!x)
            x = +((4*a**3-4*a**2*d+Math.sqrt(Math.abs((-4*a**3+4*a**2*d-4*a*b**2+8*a*b*c-4*a*c**2+4*a*d**2-4*a*g**2+4*a*l**2-4*b**2*d+8*b*c*d-4*c**2*d-4*d**3+4*d*g**2-4*d*l**2)**2-4*(4*a**2-8*a*d+4*b**2-8*b*c+4*c**2+4*d**2)*(a**4+2*a**2*b**2-4*a**2*b*c+2*a**2*c**2-2*a**2*d**2+2*a**2*g**2-2*a**2*l**2+b**4-4*b**3*c+6*b**2*c**2+2*b**2*d**2-2*b**2*g**2-2*b**2*l**2-4*b*c**3-4*b*c*d**2+4*b*c*g**2+4*b*c*l**2+c**4+2*c**2*d**2-2*c**2*g**2-2*c**2*l**2+d**4-2*d**2*g**2+2*d**2*l**2+g**4-2*g**2*l**2+l**4)))+4*a*b**2-8*a*b*c+4*a*c**2-4*a*d**2+4*a*g**2-4*a*l**2+4*b**2*d-8*b*c*d+4*c**2*d+4*d**3-4*d*g**2+4*d*l**2)/(2*(4*a**2-8*a*d+4*b**2-8*b*c+4*c**2+4*d**2))).toFixed(15);
        
        console.log(x);
        
        // calculates our y from our x
        const y = Math.sqrt(Math.abs(2*a*x+l**2-x**2-a**2)) + b;
        const y_ = b - Math.sqrt(Math.abs(2*a*x+l**2-x**2-a**2));
        // const y = Math.sqrt(Math.abs(2*c*x+l**2-x**2-c**2)) + b;
        // const y_ = b - Math.sqrt(Math.abs(2*c*x+l**2-x**2-c**2));

        console.log(y);
        console.log(y_);

        const location = { Latitude: x, Longitude: y };
        this.tbClient.v1SendTelemetry(thingsBoardDeviceToken, location);

    }   

}
