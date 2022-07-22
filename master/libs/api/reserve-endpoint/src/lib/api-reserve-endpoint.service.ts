import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Injectable } from '@nestjs/common';
import { ReserveCreateEndpoint, ReserveEndpoint, ReserveEndpointNoToken, ReserveResponse, ReserveSetEndpoint } from '../reserve-endpoint.interface';

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

       /* if (body.location != undefined) {
            if(body.location.center == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve center missing',
                };
            }
            if(body.location.location == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve border co-ordinates missing',
                };
            }
            if(body.location.location.length < 3) 
                return {
                    status : 403,
                    explanation: 'not enough co-ordinates given: '+body.location.location.length
                }
        }*/

        this.thingsboardClient.setToken(body.token);
        const response = await this.thingsboardClient.createReserve(body.email, body.NameOfReserve, body.location);
        
        if(response.status == 'fail')
        return {
            status : 500,
            explanation : response.explanation
        }

        return {
            status : 200,
            explanation : 'reserve created'
        }
    }

    //////////////////////////////////////////////////////////////////////////////////

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

        this.thingsboardClient.setToken(body.token);
        const response = await this.thingsboardClient.removeReserve(body.reserveID);
        
        if(response.status == 'fail')
        return {
            status : 500,
            explanation : response.explanation
        }

        return {
            status : 200,
            explanation : 'reserve removed'
        }

    }

    //////////////////////////////////////////////////////////////////////////////////

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

        /*if (body.location != undefined) {
            if(body.location.center == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve center missing',
                };
            }
            if(body.location.location == undefined) {
                return {
                    status: 401,
                    explanation: 'reserve border co-ordinates missing',
                };
            }
            if(body.location.location.length < 3) 
                return {
                    status : 403,
                    explanation: 'not enough co-ordinates given: '+body.location.location.length
                }
        } else if(body.location == undefined)
            return {
                status : 401,
                explanation : 'no location co-ordinates given'
            }*/

        this.thingsboardClient.setToken(body.token);
        const response = await this.thingsboardClient.updateReservePerimeter(body.reserveID, body.location);

        if(response.status == 'fail')
        return {
            status : 500,
            explanation : response.explanation
        }

        return {
            status : 200,
            explanation : 'reserve updated'
        }


    }

    //////////////////////////////////////////////////////////////////////////////////

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
        this.thingsboardClient.setToken(body.token);
        const resp = await this.thingsboardClient.CustomerInfo(body.reserveID);
        if(resp.status=='fail')
        return {
            status:500,
            explanation:resp.explanation,
        }

        return {
            status : 200,
            explanation : resp.explanation,
            data : resp.data
        }

    }

    //////////////////////////////////////////////////////////////////////////////////

    async processReserveList(body : ReserveEndpointNoToken) : Promise<ReserveResponse> {
        if (body.token == undefined || body.token == '')
        return {
            status: 401,
            explanation: 'token missing',
        };

        this.thingsboardClient.setToken(body.token);
        /*const generate = await this.thingsboardClient.generateReserveList_SystemAdmin();
        if(generate.status != 'ok')
        return {
            status : 500,
            explanation : generate.explanation
        }*/

        const response = await this.thingsboardClient.getReserveList();
        if(response.status == 'fail')
        return {
            status : 400,
            explanation : response.explanation
        }

        return {
            status : 200,
            explanation : response.explanation,
            data : response.data
        }
    }
}
