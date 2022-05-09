export interface MapApiLatest {
    token : string,
    reserveID : string
}

export interface MapApiReserve {
    token : string,
    reserveID : string,
    options : {
        items : ""
    }
}

export interface MapApiHistorical {
    token : string,
    reserveID : string,
    options : {
        limit : number,
        sort : ["new","old"]
    }
}

export interface MapApiLatestResponse {
    code : number,
    status : string,
    explanation : string,
    data : [
        {
            deviceID : string,
            locationData : {
                timeStamp:number,
                locationData : {
                    latitude : string,
                    longitude : string
                }
            }
        }
    ]
}

export interface MapApiReserveResponse {
    code : number,
    status : string,
    explanation : string,
    data : {
        reserveName : string,
        location : [
            {
                latitude : string,
                longitude : string
            }
        ]
    }
}

export interface MapApiHistoricalResponse {
    code : number,
    status : string,
    explanation : string,
    data : [
        deviceID : string,
        locations : [
            {
                timestamp : number,
                latitude : string,
                longitude : string
            }
        ]
    ]
}
