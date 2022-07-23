import { Injectable } from '@nestjs/common';

@Injectable()
export class AiHeatmapAverageService {
    private EarthRadius  = 6371;

    LatLongToGeometric(latitude:number, longitude: number) : {x:number,y:number,z:number} {
        return {
            x : Math.cos(latitude) * Math.cos(longitude),
            y : Math.cos(latitude) * Math.sin(longitude),
            z : Math.sin(latitude)
        }
    }

    GeometricAverage(GeomSet : {x:number,y:number,z:number}[]) : {x:number,y:number,z:number} {
        let Xtot: number, Ytot: number, Ztot : number;
        Xtot = 0;
        Ytot = 0;
        Ztot = 0;
        GeomSet.forEach(item => {
            Xtot += item.x;
            Ytot += item.y;
            Ztot += item.z;
        })

        return {
            x : Xtot,
            y : Ytot,
            z : Ztot
        }
    }

    GeometricToLatLong(GeomSet : {x:number,y:number,z:number}) : {latitude:number, longitude:number} {
        const hyp = Math.sqrt(GeomSet.x * GeomSet.x + GeomSet.y * GeomSet.y);
        return {
            longitude : Math.atan2(GeomSet.y, GeomSet.x),
            latitude : Math.atan2(GeomSet.z, hyp)
        }
    }
}
