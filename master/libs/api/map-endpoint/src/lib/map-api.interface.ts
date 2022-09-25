export interface MapApiLatest {
    token: string,
    reserveID: string
}

export interface MapApiReserve {
    token: string,
    options?: {
        items: ""
    }
}

//if timestamp left empty give the upper/lower limit
export interface MapApiHistorical {
    token: string,
    reserveID: string,
    deviceID: string[],
    startTime?: number,
    endTime?: number,
    pType : string
}

// enum sortHistorical {
//     new = 'new',
//     old = 'old'
// }

export interface MapApiLatestResponse {
    code: number,
    status: string,
    explanation: string,
    data?: Device[],
    furtherExplain? : string
}

export interface Device {
    deviceID: string,
    deviceName: string,
    type: string,
    pType : string,
    locationData: {
        timeStamp: number,
        location: {
            latitude: string,
            longitude: string
        }
    }[]
}

export interface MapApiReserveResponse {
    code: number,
    status: string,
    explanation: string,
    isAdmin? : boolean,
    data?: {
        reserveName: string,
        // center: {
        //     latitude: string,
        //     longitude: string
        // },
        location: GeoJSON.FeatureCollection
    }
    adminData? : {
        reserveName: string,
        location: GeoJSON.FeatureCollection
        reserveID:string
    }[]
}


export interface MapApiHistoricalResponse {
    code: number,
    status: string,
    furtherExplain? : string,
    explanation: string,
    data?: Device[],
    
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

// export interface MapHistoricalPoints{
//     deviceID:string,
//     polyline:L.Polyline,
//     markers:L.Marker[]
// }
