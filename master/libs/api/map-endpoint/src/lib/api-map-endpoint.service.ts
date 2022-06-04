import { Injectable } from '@nestjs/common';
import { Device, MapApiHistorical, MapApiHistoricalResponse, MapApiLatest, MapApiLatestResponse, MapApiReserve, MapApiReserveResponse } from './map-api.interface';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';

@Injectable()
export class ApiMapEndpointService {

    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }

    LatestProcess(content: MapApiLatest): MapApiLatestResponse {
        /* Validate Token and ReserveID */
        if (content.reserveID == undefined)
            return {
                code: 401,
                status: 'failure',
                explanation: "ReserveID missing"
            }

        if (content.token == undefined)
            return {
                code: 401,
                status: 'failure',
                explanation: "Token missing"
            }
        /* Get Device details and locations */
        /***********************************/
        /* Build response */
        return {
            code: 200,
            status: "success",
            explanation: "",
            // data: [
            //     {
            //         deviceID: "sens-11",
            //         deviceName: "Lion (harry)",
            //         type: "sensor",
            //         locationData: {
            //             timeStamp: Date.now(),
            //             location: {
            //                 latitude: '-25.755375',
            //                 longitude: '28.232314'
            //             }
            //         }
            //     },
            //     {
            //         deviceID: "sens-12",
            //         deviceName: "Zebra (larry)",
            //         type: "sensor",
            //         locationData: {
            //             timeStamp: Date.now(),
            //             location: {
            //                 latitude: '-25.755704',
            //                 longitude: '28.233245'
            //             }
            //         }
            //     },
            //     {
            //         deviceID: "sens-13",
            //         deviceName: "Giraffe (parry)",
            //         type: "sensor",
            //         locationData: {
            //             timeStamp: Date.now(),
            //             location: {
            //                 latitude: '-25.756632',
            //                 longitude: '28.233760'
            //             }
            //         }
            //     }
            // ]
        }
    }

    async ReserveProcess(content: MapApiReserve): Promise<MapApiReserveResponse> {
        /* Validate Token and ReserveID */
        if (content.reserveID == undefined)
            return {
                code: 401,
                status: 'failure',
                explanation: "ReserveID missing"
            }

        if (content.token == undefined)
            return {
                code: 401,
                status: 'failure',
                explanation: "Token missing"
            }


        /*this.thingsboardClient.setToken(content.token);
        const data = await this.thingsboardClient.getReservePerimeter();*/
        /*return {
            code : 200,
            status : "success",
            explanation : "",
            "data" : {
                reserveName : data['value']['reserveName'],
                center : data['value']['center'],
                location : data['value']['location']
            }
        }*/
        return {
            code: 200,
            status: "success",
            explanation: "",
            data: {
                reserveName: "UP",
                center: {
                    latitude: "-25.755123",
                    longitude: "28.231999"
                },
                location: [
                    {
                        latitude: "-25.753785",
                        longitude: "28.231703"
                    },
                    {
                        latitude: "-25.755650",
                        longitude: "28.230737"
                    },
                    {
                        latitude: "-25.757089",
                        longitude: "28.233456"
                    },
                    {
                        latitude: "-25.756385",
                        longitude: "28.236474"
                    },
                    {
                        latitude: "-25.754765",
                        longitude: "28.235663"
                    }
                ]
            }
        }
    }

    async HistoricalProcess(content: MapApiHistorical): Promise<MapApiHistoricalResponse> {
        /* Validate Token and ReserveID */
        // if(content.reserveID == undefined)
        //     return {
        //         code : 401,
        //         status : 'failure',
        //         explanation : "ReserveID missing"
        //     }

        // if(content.token == undefined)
        //     return {
        //         code : 401,
        //         status : 'failure',
        //         explanation : "Token missing"
        //     }  

        // this.thingsboardClient.setToken(content.token);
        // const awaitArray = Array<any>()
        // content.deviceID.forEach((device)=> {
        //     awaitArray.push(this.thingsboardClient.getDeviceHistoricalData(device, content.startTime, content.endTime))
        // })

        // // purrrformance
        // for (let i = 0; i < awaitArray.length; i++) {
        //     awaitArray[i] = await awaitArray[i];
        // }

        // let explanationOfCall = "";
        // let furtherExplain = "";

        // const data = Array<Device>();

        // awaitArray.forEach((item) => {
        //     if(item['status']=='fail') {
        //         explanationOfCall = "some devices are missing results";
        //         furtherExplain = item['explanation'];
        //         data.push({
        //             deviceID : item['name'],
        //             deviceName : "",
        //             type : "sensor",
        //             locationData : item['data']['data']
        //         })
        //     } else if(item['status']=='ok') {
        //         data.push({
        //             deviceID : item['name'],
        //             deviceName : "",
        //             type : "sensor",
        //             locationData : item['data']
        //         })
        //     }
        // })

        // return {
        //     code : 200,
        //     status : "success",
        //     explanation : explanationOfCall,
        //     data: data,
        //     furtherExplain : furtherExplain
        // }

        const toreturn: MapApiHistoricalResponse = {
            code: 200,
            status: "success",
            explanation: "",
            data: []
        }

        if (content.deviceID.includes("sens-11")) {
            toreturn.data.push({
                deviceID: "sens-11",
                deviceName: "sens-11-test",
                type: "sensor",
                locationData: [
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.755514",
                            longitude: "28.235419"
                        }
                    },
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.754886",
                            longitude: "28.231909"
                        }
                    },
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.755375",
                            longitude: "28.232314"
                        }
                    }
                ]
            })
        }
        if (content.deviceID.includes("sens-12")) {
            toreturn.data.push({
                deviceID: "sens-12",
                deviceName: "sens-12-test",
                type: "sensor",
                locationData: [
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.755147",
                            longitude: "28.233294"
                        }
                    },
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.756124",
                            longitude: "28.233701"
                        }
                    },
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.755704",
                            longitude: "28.233245"
                        }
                    }
                ]
            })
        }
        if (content.deviceID.includes("sens-13")) {
            toreturn.data.push({
                deviceID: "sens-13",
                deviceName: "sens-13-test",
                type: "sensor",
                locationData: [
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.755332",
                            longitude: "28.232264"
                        }

                    },
                    {
                        timeStamp: Date.now() - 6000,
                        location: {
                            latitude: "-25.756632",
                            longitude: "28.233760"
                        }
                    }
                ]
            });
        }
        return toreturn;
    }
}
