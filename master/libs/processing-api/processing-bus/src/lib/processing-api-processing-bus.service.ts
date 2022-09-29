import { DatabaseProxyService } from '@lora/database';
import { LocationService } from '@lora/location';
import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Injectable, Logger } from '@nestjs/common';
import { Prop, Schema } from '@nestjs/mongoose';
//import { DevicePerimeter } from 'libs/database-proxy/src/database-interfaces.interface';

@Injectable()
export class ProcessingApiProcessingBusService {

    constructor(private database: DatabaseProxyService, private thingsboardClient: ThingsboardThingsboardClientService, public locationService: LocationService) { }

    /* forward to message queue for processing/splitting */
    async forwardChirpstackData(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string, processed: false }): Promise<boolean> {
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
        try {
            this.database.insertDevicePerimeter(body);
        } catch (error) {
            Logger.log("Save Device perimeter error");
            Logger.log(error)
        }
    }

    /* forward new perimeter to all device in table */
    async updateDevicePerimeter(body: { deviceID: string, perimeter: number[], name: string }) {
        try {
            this.database.updateDevicePerimeter(body);
        } catch (error) {
            Logger.log("Save Device perimeter error");
            Logger.log(error)
        }
    }

    /* forward new name of reserve to all devices associated */
    async updateDeviceReserveName(body: { name: string, newName: string }) {
        try {
            this.database.updateDevicePerimeterName(body);
        } catch (error) {
            Logger.log('Update perimeter name');
            Logger.log(error)
        }
    }

    async RemoveDeviceFromPerimeter(body: { deviceID: string }) {
        try {
            this.database.removeDeviceFromPerimeter(body);
        } catch (error) {
            Logger.log("Remove device fail");
            Logger.log(error);
        }
    }

    async getDevicePerimeter(deviceID: string) : Promise<any> {
        try {
            return this.database.getDevicePerimeter(deviceID);
        } catch (error) {
            Logger.log("Get Device perimeter error");
            Logger.log(error);
            return null;
        }
    }

    /* get the last data points */
    //TODO change this to the devicedata input
    async getRssiInfo(deviceEUI: string, numberOfRecords: number): Promise<any> {
        try {
            return await this.database.fetchRSSIinfos(deviceEUI, numberOfRecords);
        } catch (error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
        return false;
    }

    /* mark points as proccessed */
    async markProcessed(data: { deviceEUI: string, timestamp: string }[]): Promise<void> {
        console.log("Process mark ", data);
        try {
            await this.database.markAsProcessed(data);
            return;
        } catch (error) {
            Logger.log('Delete Error');
            Logger.log(error);
        }
        return;
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

    async addToReady(data: { deviceEUI: string, timestamp: number, data: string }) {
        try {
            return await this.database.addToReady(data);
        } catch (error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async checkCountReady(deviceEUI: string) {
        try {
            return await this.database.checkNumReady(deviceEUI);
        } catch (error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async getLastReady(deviceEUI: string) {
        try {
            const data = await this.database.getLatestReady(deviceEUI);
            await this.database.deleteReadyAt(data._id?.toString());
            return data;
        } catch (error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }

    async deleteReadyAt(deviceID: string) {
        try {
            return await this.database.deleteReadyAt(deviceID);
        } catch (error) {
            Logger.log('Error');
            Logger.log(error);
        }
    }


    async sendProcessedDatatoTB(accessToken: string, data: { latitude: number, longitude: number, pType: string }) {
        try {
            return this.thingsboardClient.v1SendTelemetry(accessToken, data);
        } catch (error) {
            Logger.log('TB Send Error');
            Logger.log(error);
            return false;
        }
    }

    async LocationServiceProcess(data: any, deviceToken: string) {
        try {
            return await this.locationService.calculateLocation(data, deviceToken);
        } catch (error) {
            Logger.log('Location Service Error');
            Logger.log(error);
            return false;
        }
    }
}