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

    /* mark points as proccessed */
    async markProcessed(data:{deviceEUI:string,timestamp:string}[]):Promise<void>{
        console.log("Process mark ",data);
        try {
            await this.database.markAsProcessed(data);
            return;
        } catch(error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
        return;
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

    async addToReady(data:{deviceEUI:string,timestamp:number,data:string}){
        try {
            return await this.database.addToReady(data);
        } catch(error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async checkCountReady(deviceEUI:string){
        try {
            return await this.database.checkNumReady(deviceEUI);
        } catch(error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async getLastReady(deviceEUI:string){
        try {
            return await this.database.getLatestReady(deviceEUI);
        } catch(error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async deleteReadyAt(deviceID:string){
        try {
            return await this.database.deleteReadyAt(deviceID);
        } catch(error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

}
