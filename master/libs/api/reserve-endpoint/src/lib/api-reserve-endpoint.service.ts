import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Injectable } from '@nestjs/common';
import { ReserveResponse } from '../reserve-endpoint.interface';

@Injectable()
export class ApiReserveEndpointService {
    constructor(private thingsboardClient : ThingsboardThingsboardClientService) {};

    async processReserveCreate(body : ReserveCreateEndpoint) : Promise<ReserveResponse> {}

    async processReserveRemove(body : ReserveEndpoint) : Promise<ReserveResponse> {}

    async processReserveSet(body : ReserveEndpoint) : Promise<ReserveResponse> {}

    async processReserveInfo(body : ReserveSetEndpoint) : Promise<ReserveResponse> {}
}
