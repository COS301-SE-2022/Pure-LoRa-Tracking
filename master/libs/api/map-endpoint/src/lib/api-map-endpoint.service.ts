import { Injectable } from '@nestjs/common';
import { Device, MapApiHistorical, MapApiHistoricalResponse, MapApiLatest, MapApiLatestResponse, MapApiReserve, MapApiReserveResponse } from './map-api.interface';
import { thingsboardResponse, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';

@Injectable()
export class ApiMapEndpointService {

    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }

    async ReserveProcess(content: MapApiReserve): Promise<MapApiReserveResponse> {
        //console.log(content)
        /* Validate Token and ReserveID */
        if (content.token == undefined)
            return {
                code: 401,
                status: 'reserve-process failure',
                explanation: "Token missing"
            }

        this.thingsboardClient.setToken(content.token);
        const userInfo = await this.thingsboardClient.getUserInfoFromToken();

        if(userInfo.status == 'fail' || userInfo.data.authority == undefined)
        return {
            code : 500,
            status : 'reserve-process failure',
            explanation : userInfo.explanation
        }

        let data;
        if (userInfo.data.authority == 'TENANT_ADMIN') {
            data = await this.thingsboardClient.AdminGetCustomers();
            if(data.status == 'fail')
            return {
                code : 500,
                status : 'reserve-process failure',
                explanation : data.explanation
            }
            const adminData = new Array<any>();
            data.data.data.forEach(item => {
                adminData.push({
                    reserveName : item.name,
                    location : item.additionalInfo?.location,
                    reserveID:item.id.id
                })
            })


            return {
                status : "reserve-process success",
                code : 200,
                adminData : adminData,
                isAdmin : true,
                explanation : 'ok'
            }

        } else {
            data = await this.thingsboardClient.getReservePerimeter();
        }
        //console.log('data :>> ', data.data);
        if (data.code == 401) {
            return {
                code: 401,
                status: "reserve-process failure",
                explanation: "Username/Password/Token invalid"
            }
        }
        else if (data.code == 500) {
            return {
                code: 404,
                status: "reserve-process failure",
                explanation: "Reserve not found"
            }
        }
        //console.log(data);

        return {
            code: 200,
            status: "reserve-process success",
            explanation: "",
            "data": {
                reserveName: data.data.reserveName,
                location: data.data.location
            },
            isAdmin:false
        }
        // return {
        //     code: 200,
        //     status: "success",
        //     explanation: "",
        //     data: {
        //         reserveName: "UP",
        //         center: {
        //             latitude: "-25.755123",
        //             longitude: "28.231999"
        //         },
        //         location: [
        //             {
        //                 latitude: "-25.753785",
        //                 longitude: "28.231703"
        //             },
        //             {
        //                 latitude: "-25.755650",
        //                 longitude: "28.230737"
        //             },
        //             {
        //                 latitude: "-25.757089",
        //                 longitude: "28.233456"
        //             },
        //             {
        //                 latitude: "-25.756385",
        //                 longitude: "28.236474"
        //             },
        //             {
        //                 latitude: "-25.754765",
        //                 longitude: "28.235663"
        //             }
        //         ]
        //     }
        // }
    }

    async HistoricalProcess(content: MapApiHistorical): Promise<MapApiHistoricalResponse> {
        /* Validate Token and ReserveID */
        if (content.reserveID == undefined)
            return {
                code: 400,
                status: 'failure',
                explanation: "ReserveID missing"
            }

        if (content.token == undefined)
            return {
                code: 401,
                status: 'failure',
                explanation: "Token missing"
            }


        if (content.startTime == undefined || content.endTime == undefined) {
            content.startTime = Date.now() - 24 * 60 * 60 * 1000;
            content.endTime = Date.now();
            //console.log(content.startTime);
            //console.log(content.endTime);
        }

        this.thingsboardClient.setToken(content.token);
        // const waiter=await this.thingsboardClient.validateToken();

        // if(waiter==false){
        //     return {
        //         code : 401,
        //         status : 'failure',
        //         explanation : "Token invalid"
        //     }
        // }

        if (content.startTime != undefined)
            content.startTime = new Date(content.startTime).getTime()

        if (content.endTime != undefined)
            content.endTime = new Date(content.endTime).getTime()

        const awaitArray = Array<any>()
        if (content.deviceID != undefined && content.deviceID.length > 0) {
            content.deviceID.forEach((device) => {
                /* await array -> telem results */
                awaitArray.push(this.thingsboardClient.getDeviceHistoricalData(device, content.pType, content.startTime, content.endTime))
            })
        } else {
            let devices;
            if(content.reserveID==undefined) devices = await this.thingsboardClient.getDeviceInfos();
            else devices = await this.thingsboardClient.getDeviceInfos([],content.reserveID);

            //console.log(devices);
            const other = devices.data.filter(val => val.isGateway == false);
            other.forEach((device) => {
                /* await array -> telem results */
                awaitArray.push(this.thingsboardClient.getDeviceHistoricalData(device.deviceID, content.pType, content.startTime, content.endTime))
            })

        }

        this.thingsboardClient.setToken(content.token);
        for (let i = 0; i < awaitArray.length; i++) {
            awaitArray[i] = await awaitArray[i];
        }


        let explanationOfCall = "";
        let furtherExplain = "";

        const data = Array<Device>();
        //console.log("\n\n\n\nreached");
        awaitArray.forEach((item: thingsboardResponse) => {
            if (item.status == "fail" && item.explanation == "Invalid username or password") return {
                code: 401,
                status: "fail",
                explanation: "Invalid username or password",
                data: [],
            }
            if(item.data==undefined)
                item.data.telemetryResults = [];
            else if (item.data.telemetryResults == undefined)
                item.data.telemetryResults = [];

            if (item.status == 'fail') {
                explanationOfCall = "some devices are missing results";
                furtherExplain = item.explanation;
                data.push({
                    pType:content.pType,
                    deviceID: item.name,
                    deviceName: item.explanation,
                    hardwareid:item.furtherExplain,
                    type: "sensor",
                    locationData: item.data
                })
            } else if (item['status'] == 'ok') {
                data.push({
                    pType:content.pType,
                    deviceID: item['name'],
                    deviceName: item.explanation,
                    hardwareid:item.furtherExplain,
                    type: "sensor",
                    locationData: item.data.data.telemetryResults
                })
            }
        })
        //console.table(data[0]["locationData"])
        return {
            code: 200,
            status: "success",
            explanation: explanationOfCall,
            data: data,
            furtherExplain: furtherExplain
        }
    }

       /* LatestProcess(content: MapApiLatest): MapApiLatestResponse {
        /* Validate Token and ReserveID */
       /* if (content.reserveID == undefined)
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
       /* return {
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
    }*/
}
