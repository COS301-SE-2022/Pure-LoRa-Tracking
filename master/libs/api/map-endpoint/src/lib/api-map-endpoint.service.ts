import { Injectable } from '@nestjs/common';
import { MapApiHistorical, MapApiHistoricalResponse, MapApiLatest, MapApiLatestResponse, MapApiReserve, MapApiReserveResponse } from './map-api.interface';

@Injectable()
export class ApiMapEndpointService {

    LatestProcess(content : MapApiLatest) : MapApiLatestResponse {
        /* Validate Token and ReserveID */
        if(content.reserveID == undefined)
            return {
                code : 401,
                status : 'failure',
                explanation : "ReserveID missing"
            }

        if(content.token == undefined)
            return {
                code : 401,
                status : 'failure',
                explanation : "Token missing"
            }    
        /* Get Device details and locations */
        /***********************************/
        /* Build response */
        return {
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
        }
    }

    HistoricalProcess(content : MapApiHistorical) : MapApiHistoricalResponse {

        return
    }

    ReserveProcess(content : MapApiReserve) : MapApiReserveResponse {

        return
    }
}
