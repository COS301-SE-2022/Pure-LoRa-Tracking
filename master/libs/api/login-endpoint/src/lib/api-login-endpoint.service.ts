import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';

@Injectable()
export class ApiLoginEndpointService {
    constructor(private thingsboardClient: ThingsboardThingsboardClientService) { }
    
}
