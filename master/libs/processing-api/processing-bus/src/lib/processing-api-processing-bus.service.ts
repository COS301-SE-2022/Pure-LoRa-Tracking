import { DatabaseProxyService } from '@lora/database';
import { LocationService } from '@lora/location';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProcessingApiProcessingBusService {

    constructor(private database: DatabaseProxyService, private thingsboardClient: ThingsboardThingsboardClientService, public locationService: LocationService) { }

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
    async saveDevicePerimeterToDB(body: { perimeter: number[], name: string, deviceID: string }) {
        this.database.insertDevicePerimeter(body)
    }

    /* forward new perimeter to all device in table */
    async updateDevicePerimeter(body: { perimeter: number[], name: string }) {
        this.database.updateDevicePerimeter(body)
    }

    /* forward new name of reserve to all devices associated */
    async updateDeviceReserveName(body: { name: string, newName: string }) {
        this.database.updateDevicePerimeterName(body);
    }

    async getDevicePerimeter(deviceID: string) {
        return this.database.getDevicePerimeter(deviceID);
    }

    /* request delete device data from db service */
    async deleteDeviceData(data: { timestamp: number, deviceEUI: string }) {
        try {
            this.database.deleteDeviceData(data.deviceEUI, data.timestamp);
        } catch (error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
    }

    async sendProcessedDatatoTB(accessToken: string, data: { result: { latitude: number, longitude: number }, processingType: string }) {
        try {
            this.thingsboardClient.v1SendTelemetry(accessToken, { ...data, timestamp: + new Date() });
        } catch (error) {
            Logger.log('TB Send Error');
            Logger.log(error);
        }
    }

    async LocationServiceProcess(data: any, deviceToken: string) {
        try {
            return this.locationService.calculateLocation(data, deviceToken);
        } catch (error) {
            Logger.log('Location Service Error');
            Logger.log(error);
        }
    }
}
