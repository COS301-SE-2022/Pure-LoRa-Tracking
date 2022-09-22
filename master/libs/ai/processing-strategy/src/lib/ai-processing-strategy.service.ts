import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';

@Injectable()
export class AiProcessingStrategyService {

    constructor(protected serviceBus : ProcessingApiProcessingBusService){}

    // pure virtual?
    configureInitialParameters?(initialParameters?);
    
    async processData?(data:any) : Promise<boolean>;
}
