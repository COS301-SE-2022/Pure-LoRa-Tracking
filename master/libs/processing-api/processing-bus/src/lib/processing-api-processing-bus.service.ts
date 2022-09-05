import { DatabaseProxyService } from '@lora/database';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProcessingApiProcessingBusService {

    constructor(private database: DatabaseProxyService) { }

    /* forward to message queue for processing/splitting */
    async forwardChirpstackData(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string ,processed:false}): Promise<boolean> {
        try {
            this.database.saveRSSIinfos(data);
        } catch (Error) {
            console.log('insert data error')
            console.log(Error);
            return false;
        }
        return true;
    }

    /* get the last data points */
    //TODO change this to the devicedata input
    async getRssiInfo(deviceEUI: string, numberOfRecords: number):Promise<any>{
        try {
            return await this.database.fetchRSSIinfos(deviceEUI,numberOfRecords);
        } catch(error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
        return false;
    }

    /* request delete device data from db service */
    async deleteDeviceData(data:{timestamp:number, deviceEUI:string}) {
        try {
            this.database.deleteDeviceData(data.deviceEUI, data.timestamp);
        } catch(error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
    }
}
