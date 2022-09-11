import { DatabaseProxyService } from '@lora/database';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProcessingApiProcessingBusService {

    constructor(private database: DatabaseProxyService) { }

    /* forward to message queue for processing/splitting */
    async forwardChirpstackData(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string }): Promise<boolean> {
        try {
            this.database.saveRSSIinfos(data);
        } catch (Error) {
            console.log('insert data error')
            console.log(Error);
            return false;
        }
        return true;
    }

    /* forward new device and perimeter to relevant mongo table */
    async saveDevicePerimeterToDB(body: { perimeter: number[], name: string, deviceID: string}) {
        this.database.insertDevicePerimeter(body)
    }

    /* forward new perimeter to all device in table */
    async updateDevicePerimeter(body: { perimeter: number[], name: string }) {
        this.database.updateDevicePerimeter(body)
    }

    /* forward new name of reserve to all devices associated */
    async updateDeviceReserveName(body: { name: string, newName:string }) {
        this.database.updateDevicePerimeterName(body);
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
