export interface AverageInput {
    sensorID : string;
    coordinates : {
        latitude : number,
        longitude : number,
        timestamp : number
    } []
    truePoint : {
        latitude : number,
        longitude : number,
    }
}

