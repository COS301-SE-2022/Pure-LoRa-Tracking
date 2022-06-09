import * as L from "leaflet"

export interface MapApiLatest {
    token: string,
    reserveID: string
}

export interface MapApiReserve {
    token: string,
    reserveID: string,
    options: {
        items: ""
    }
}

/*
if either timestamp left empty give past 24 hours
if deviceID is not given, give all devices of that reserve
otherwise an array of deviceIDs will be given
*/
export interface MapApiHistorical {
    token: string,
    reserveID: string,
    deviceID?: string[],
    startTime?: number,
    endTime?: number
}

// enum sortHistorical {
//     new = 'new',
//     old = 'old'
// }

export interface MapApiLatestResponse {
    code: number,
    status: string,
    explanation: string,
    data?: Device[]
}

export interface Device {
    deviceID: string,
    deviceName: string,
    type: string,
    locationData: {
        longitude: string,
        latitude: string,
        timeStamp: number
    }[]
}

export interface MapApiReserveResponse {
    code: number,
    status: string,
    explanation: string,
    data?: {
        reserveName: string,
        center: {
            latitude: string,
            longitude: string
        },
        location:
        {
            latitude: string,
            longitude: string
        }[]
    }
}


export interface MapApiHistoricalResponse {
    code: number,
    status: string,
    explanation: string,
    data?: MapApiHistoricalData
}



export interface MapApiHistoricalData {
    deviceID: string,
        locations:
        {
            timestamp: number,
            latitude: string,
            longitude: string
        }[]
}

export interface MapHistoricalPoints{
    deviceID:string,
    polyline:L.Polyline,
    markers:L.Marker[]
}
