import { DatabaseProxyService } from '@lora/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessingApiProcessingBusService {

    constructor(private database: DatabaseProxyService) { }

    /* forward to message queue for processing/splitting */
    async forwardChirpstackData(data: { timestamp: number, deviceID: string, data: string, eventtype: string }): Promise<boolean> {
        try {
            this.database.InsertRaw(data);
        } catch (Error) {
            console.log('insert data error')
            console.log(Error);
            return false;
        }
        return true;
    }
}