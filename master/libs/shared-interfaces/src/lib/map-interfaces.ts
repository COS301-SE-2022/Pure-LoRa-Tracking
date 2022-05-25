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

//if timestamp left empty give the upper/lower limit
export interface MapApiHistorical {
    token: string,
    reserveID: string,
    deviceID: string[],
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

interface Device {
    deviceID: string,
    deviceName: string,
    type: string,
    locationData: {
        timeStamp: number,
        location: {
            latitude: string,
            longitude: string
        }
    }
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
    data?: MapApiHistoricalData[]
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