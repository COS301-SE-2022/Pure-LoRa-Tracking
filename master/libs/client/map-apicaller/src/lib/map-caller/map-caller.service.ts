import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MapCallerService {

  constructor(private http:HttpClient) { 
    //placeholder
  }

  async getReserve(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      // this.http.post("localhost:3333/api/map/reserve",{"token":token,"reserveID":reserveID}).subscribe(val=>{
      //   console.log(val);
      //   res(val)
      // });
      res( {
        code : 200,
        status : "success",
        explanation : "",
        data : {
            reserveName : "UP",
            center : {
                latitude : "-25.755123",
                longitude : "28.231999"
            },
            location : [
                {
                    latitude : "-25.753785",
                    longitude : "28.231703"
                },
                {
                    latitude : "-25.755650",
                    longitude : "28.230737"
                },
                {
                    latitude : "-25.757089",
                    longitude : "28.233456"
                },
                {
                    latitude : "-25.756385",
                    longitude : "28.236474"
                },
                {
                    latitude : "-25.754765",
                    longitude : "28.235663"
                }
            ]
        }
    })
    })
  }
  
  async getLatest(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      res( {
        code : 200,
        status : "success",
        explanation : "",
        data : [
            {
                deviceID : "sens-11",
                type : "sensor",
                locationData : {
                    timeStamp : Date.now(),
                    location : {
                        latitude : '-25.755375',
                        longitude : '28.232314'
                    }
                }
            },
            {
                deviceID : "sens-12",
                type : "sensor",
                locationData : {
                    timeStamp : Date.now(),
                    location : {
                        latitude : '-25.755704',
                        longitude : '28.233245'
                    }
                }
            },
            {
                deviceID : "sens-13",
                type : "sensor",
                locationData : {
                    timeStamp : Date.now(),
                    location : {
                        latitude : '-25.756632',
                        longitude : '28.233760'
                    }
                }
            }
        ]
    })
    });
  }


}
