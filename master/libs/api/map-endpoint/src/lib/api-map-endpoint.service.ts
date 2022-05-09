import { Injectable } from '@nestjs/common';
import { MapApiHistorical, MapApiHistoricalResponse, MapApiLatest, MapApiLatestResponse, MapApiReserve, MapApiReserveResponse } from './map-api.interface';

@Injectable()
export class ApiMapEndpointService {

    LatestProcess(content : MapApiLatest) : MapApiLatestResponse {

        return
    }

    HistoricalProcess(content : MapApiHistorical) : MapApiHistoricalResponse {

        return
    }

    ReserveProcess(content : MapApiReserve) : MapApiReserveResponse {

        return
    }
}
