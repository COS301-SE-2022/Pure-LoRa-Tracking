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

    ReserveProcess(content : MapApiReserve) : MapApiReserveResponse {
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
        return {
            code : 200,
            status : "success",
            explanation : "",
            data : {
                reserveName : "UP",
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
        }
    }
    
    HistoricalProcess(content : MapApiHistorical) : MapApiHistoricalResponse {
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
        return {
            code : 200,
            status : "success",
            explanation : "",
            data : [
                {
                    deviceID : "sens-11",
                    locations : [
                        {
                            timestamp : Date.now()-6000,
                            latitude : "-25.755514",
                            longitude : "28.235419"
                        },
                        {
                            timestamp : Date.now()-3000,
                            latitude : "-25.754886",
                            longitude : "28.231909"
                        },
                        {
                            timestamp : Date.now(),
                            latitude : '-25.755375',
                            longitude : '28.232314'
                        }
                    ]
                },
                {
                    deviceID : "sens-12",
                    locations : [
                        {
                            timestamp : Date.now()-6000,
                            latitude : "-25.755147",
                            longitude : "28.233294"
                        },
                        {
                            timestamp : Date.now()-3000,
                            latitude : "-25.756124",
                            longitude : "28.233701"
                        },
                        {
                            timestamp : Date.now(),
                            latitude : '-25.755704',
                            longitude : '28.233245'
                        }
                    ]
                },
                {
                    deviceID : "sens-13",
                    locations : [
                        {
                            timestamp : Date.now()-6000,
                            latitude : "-25.755332",
                            longitude : "28.232264"
                        },
                        {
                            timestamp : Date.now()-3000,
                            latitude : '-25.756632',
                            longitude : '28.233760'
                        }
                    ]
                }
            ]
        }
    }
}
