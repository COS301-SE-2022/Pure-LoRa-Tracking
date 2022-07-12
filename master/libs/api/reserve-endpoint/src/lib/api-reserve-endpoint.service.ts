import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Injectable } from '@nestjs/common';
import { ReserveCreateEndpoint, ReserveEndpoint, ReserveResponse, ReserveSetEndpoint } from '../reserve-endpoint.interface';

@Injectable()
export class ApiReserveEndpointService {
    constructor(private thingsboardClient : ThingsboardThingsboardClientService) {};

    async processReserveCreate(body : ReserveCreateEndpoint) : Promise<ReserveResponse> {
        if (body.token == undefined || body.token == '')
        return {
            status: 401,
            explanation: 'token missing',
        };

        if (body.NameOfReserve == undefined || body.NameOfReserve == '')
        return {
            status: 401,
            explanation: 'Reserve Name missing',
        };

        if (body.email == undefined || body.email == '')
        return {
            status: 401,
            explanation: 'Email Address missing, this can be the owner\'s or reserve\'s email',
        };

        if (body.location != undefined) {
            if(body.location.center == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve center missing',
                };
            }
            if(body.location.coordinates == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve border co-ordinates missing',
                };
            }
            if(body.location.coordinates.length < 3) 
                return {
                    status : 403,
                    explanation: 'not enough co-ordinates given: '+body.location.coordinates.length
                }
        }
    }

    async processReserveRemove(body : ReserveEndpoint) : Promise<ReserveResponse> {
        if (body.token == undefined || body.token == '')
        return {
            status: 401,
            explanation: 'token missing',
        };

        if (body.reserveID == undefined || body.reserveID == '')
        return {
            status: 401,
            explanation: 'Reserve ID missing',
        };
    }

    async processReserveSet(body : ReserveSetEndpoint) : Promise<ReserveResponse> {
        if (body.token == undefined || body.token == '')
        return {
            status: 401,
            explanation: 'token missing',
        };

        if (body.reserveID == undefined || body.reserveID == '')
        return {
            status: 401,
            explanation: 'Reserve ID missing',
        };

        if (body.location != undefined) {
            if(body.location.center == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve center missing',
                };
            }
            if(body.location.coordinates == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve border co-ordinates missing',
                };
            }
            if(body.location.coordinates.length < 3) 
                return {
                    status : 403,
                    explanation: 'not enough co-ordinates given: '+body.location.coordinates.length
                }
        } else if(body.location == undefined)
            return {
                status : 401,
                explanation : 'no location co-ordinates given'
            }
    }

    async processReserveInfo(body : ReserveEndpoint) : Promise<ReserveResponse> {
        if (body.token == undefined || body.token == '')
        return {
            status: 401,
            explanation: 'token missing',
        };

        if (body.reserveID == undefined || body.reserveID == '')
        return {
            status: 401,
            explanation: 'Reserve ID missing',
        };
    }
}
