import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';
import * as trilat from 'trilat';

@Injectable()
export class LocationService {
    constructor(private tbClient: ThingsboardThingsboardClientService) { }

    
        //WGS 84 standard values
        // https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
        private EARTH_RADIUS = 6378137.0;  //a
        private EARTH_RADIUS_SQR = this.EARTH_RADIUS * this.EARTH_RADIUS;  //a^2  asqr
        private FLATTENING_DENOM = 298.257223563
        private FLATTENING = 1 / this.FLATTENING_DENOM; //f
        private POLAR_RADIUS = this.EARTH_RADIUS * (1 - this.FLATTENING);  //b -> 6356752.3142m
        private POLAR_RADIUS_SQR = this.POLAR_RADIUS * this.POLAR_RADIUS; //b^2   bsqr
        private E = Math.sqrt((this.EARTH_RADIUS_SQR - this.POLAR_RADIUS_SQR) / this.EARTH_RADIUS_SQR);  // 6.69437999014×10^−3
        private E_PRIME = Math.sqrt((this.EARTH_RADIUS_SQR - this.POLAR_RADIUS_SQR) / this.POLAR_RADIUS_SQR); // 6.73949674228×10^−3

        // prime vertical radius of curvature => https://en.wikipedia.org/wiki/Earth_radius#Prime_vertical
        CalcN(latitude) {
            return this.EARTH_RADIUS / (Math.sqrt(1 - this.E * this.E * Math.pow(Math.sin(latitude), 2)));
        }

        degreesToRad(degrees: number) {
            return degrees * (Math.PI / 180);
        };

        RadTodegrees(rad: number) {
            return rad * (180 / Math.PI);;
        };

        GeodeticToECEF(latitude, longitude, height) {
            latitude = this.degreesToRad(latitude);
            longitude = this.degreesToRad(longitude);
            // calculate N(phi)
            const N = this.CalcN(latitude);

            //Now calculate the Cartesian coordinates
            const X = (N + height) * Math.cos(latitude) * Math.cos(longitude);
            const Y = (N + height) * Math.cos(latitude) * Math.sin(longitude);
            const Z = ((this.POLAR_RADIUS_SQR / this.EARTH_RADIUS_SQR) * N + height) * Math.sin(latitude);

            return [X, Y, Z];
        }

        ECEFToGeodetic(X, Y, Z) {
            //Auxiliary values first
            const p = Math.sqrt(X * X + Y * Y);
            const theta = Math.atan((Z * this.EARTH_RADIUS) / (p * this.POLAR_RADIUS));

            const sintheta = Math.sin(theta);
            const costheta = Math.cos(theta);

            const num = Z + this.E_PRIME * this.E_PRIME * this.POLAR_RADIUS * sintheta * sintheta * sintheta;
            const denom = p - this.E * this.E * this.EARTH_RADIUS * costheta * costheta * costheta;

            //Now calculate LLA
            const latitude = Math.atan(num / denom);
            // let longitude = Math.atan(Y/X);
            const longitude = Math.atan2(Y, X);

            const N = this.CalcN(latitude);
            const altitude = (p / Math.cos(latitude)) - N;

            // if (X < 0 && Y < 0) {
            //     longitude = longitude - Math.PI;
            // }

            // if (X < 0 && Y > 0) {
            //     longitude = longitude + Math.PI;
            // }

            return [this.RadTodegrees(latitude), this.RadTodegrees(longitude), altitude];
        }

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
        private BASE_FACTOR = -61.1;
        private ENV_FACTOR = 2;

        rssiToMeters(rssi: number) {
            if (rssi < this.BASE_FACTOR)
                return Math.pow(10, ((this.BASE_FACTOR - rssi) / (10 * this.ENV_FACTOR)))
            else
                return 1;
            // return Math.pow(10,((BASE_FACTOR) / 10 * ENV_FACTOR))
        }


    calculateLocation(gatewayData: UplinkRXInfo[], thingsBoardDeviceToken: string) {
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
        gatewayData.sort((a, b) => {
            return a.getRssi() - b.getRssi();
        })

        // calculate distance from RSSI
        const len1Meter = this.rssiToMeters(gatewayData[0].getRssi());
        const len1Degrees = len1Meter / this.EARTH_RADIUS;
        const len2Meter = this.rssiToMeters(gatewayData[1].getRssi());
        const len2Degrees = len2Meter / this.EARTH_RADIUS;
        const len3Meter = this.rssiToMeters(gatewayData[2].getRssi());
        const len3Degrees = len3Meter / this.EARTH_RADIUS;

        console.log('dist1 ' + len1Meter);
        console.log('dist2 ' + len2Meter);
        console.log('dist3 ' + len3Meter);

        const gateway1Location = gatewayData[0].getLocation();
        const gateway2Location = gatewayData[1].getLocation();
        const gateway3Location = gatewayData[2].getLocation();

        const gw1Lat = gateway1Location.getLatitude();
        const gw1Long = gateway1Location.getLongitude();
        const gw1Height = gateway1Location.getAltitude();
        const gw2Lat = gateway2Location.getLatitude();
        const gw2Long = gateway2Location.getLongitude();
        const gw2Height = gateway2Location.getAltitude();
        const gw3Lat = gateway3Location.getLatitude();
        const gw3Long = gateway3Location.getLongitude();
        const gw3Height = gateway3Location.getAltitude();
        /*
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
        
        // console.log(x);
        
        // calculates our y from our x
        const y = Math.sqrt(Math.abs(2*a*x+l**2-x**2-a**2)) + b;
        const y_ = b - Math.sqrt(Math.abs(2*a*x+l**2-x**2-a**2));
        // const y = Math.sqrt(Math.abs(2*c*x+l**2-x**2-c**2)) + b;
        // const y_ = b - Math.sqrt(Math.abs(2*c*x+l**2-x**2-c**2));

        console.log(y);
        console.log(y_);
        */

        // ====================
        // We need to do conversion from our current geodetic form to ECEF (latlong to euclidean)
        console.log("Height: " + gw1Height);
        const gw1ECEF = this.GeodeticToECEF(gw1Lat, gw1Long, len1Meter);
        const gw2ECEF = this.GeodeticToECEF(gw2Lat, gw2Long, len2Meter);
        const gw3ECEF = this.GeodeticToECEF(gw3Lat, gw3Long, len3Meter);

        const input = [
            //      X     Y     R
            gw1ECEF,
            gw2ECEF,
            gw3ECEF
        ]
        // console.log(input);
        const output: [number, number] = trilat(input);
        // console.log(output);
        const avgHeight = (gw1ECEF[2] + gw2ECEF[2] + gw3ECEF[2]) / 3;

        const location_Geodetic = this.ECEFToGeodetic(output[0], output[1], avgHeight);
        // console.log(location_Geodetic);
        const location = { Latitude: location_Geodetic[0], Longitude: location_Geodetic[1] };
        this.tbClient.v1SendTelemetry(thingsBoardDeviceToken, location);

    }

    MetersToRSSI(meters: number): number {
        if (meters == 1)
            return this.BASE_FACTOR
        else
            return this.BASE_FACTOR - 10 * this.ENV_FACTOR * Math.log10(meters)
    }

    /*
        credit: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula 
        Optimised for batch processing
    */
    distanceInMeters(lat1 : number, lon1 : number, lat2 : number, lon2 : number) {
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
      }

}
