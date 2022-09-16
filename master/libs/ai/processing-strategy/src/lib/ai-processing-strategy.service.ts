import { Injectable } from '@nestjs/common';

@Injectable()
export class AiProcessingStrategyService {

    // pure virtual?
    configureInitialParameters?(initialParameters?);
    
    async processData?(data:any) : Promise<boolean>;
}
