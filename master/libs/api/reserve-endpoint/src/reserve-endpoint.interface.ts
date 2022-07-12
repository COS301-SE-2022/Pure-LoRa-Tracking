export interface ReserveEndpoint {
    token : string;
    reserveID : string;
}

export interface ReserveCreateEndpoint {
    token : string;
    NameOfReserve : string;
    email : string;
    location? : {
        coordinates : {
            latitude : number;
            longitude : number;
        } [];
        center : {
            latitude : number;
            longitude : number;
        }
    }
}

export interface ReserveSetEndpoint {
    token : string;
    reserveID : string;
    location : {
        coordinates : {
            latitude : number;
            longitude : number;
        } [];
        center : {
            latitude : number;
            longitude : number;
        }
    }
}

export interface ReserveResponse {
    status : number;
    explanation : string;
    furtherExplain? : string;
    data? : any;
}



