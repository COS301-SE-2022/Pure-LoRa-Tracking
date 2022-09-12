import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AverageInput, AverageInputDocument, DataDocument, DataInput, DevicePerimeter, DevicePerimeterDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(AverageInput.name) private AverageModel: Model<AverageInputDocument>,
        @InjectModel(DataInput.name) private DataModel: Model<DataDocument>,
        @InjectModel(DevicePerimeter.name) private DevicePerimeterModel: Model<DevicePerimeterDocument>
    ) { }


    /*insertLocation(dataToInsert : DataInput) {
        const Insert = new this.DataModel(dataToInsert);
        return Insert.save();
    }*/

    async insertAverageRecord(data: AverageInput): Promise<AverageInput> {
        const Insert = new this.AverageModel(data);
        return await Insert.save();
    }

    async getAverageData(deviceID: string): Promise<AverageInput[]> {
        return this.AverageModel.find({ deviceID: deviceID }).exec();
    }

    public async saveRSSIinfos(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string }) {
        //console.log("Insert Raw:\n");
        //console.table(data);
        const Insert = new this.DataModel(data);
        return await Insert.save();
    }

    public async fetchRSSIinfos(deviceEUI: string, numberOfRecords: number): Promise<DataInput[]> {
        Logger.log(`Fetch ${numberOfRecords}\n`);
        const data = await this.DataModel.find({deviceEUI:deviceEUI}).sort({timestamp:-1}).limit(numberOfRecords).exec();
        const res = new Array<DataInput>();
        data.forEach(item => {
            res.push({
                data : item.data,
                deviceEUI : item.deviceEUI,
                eventtype : item.eventtype,
                timestamp : item.timestamp
            })
        })
        return res;
    }

    public async deleteDeviceData(deviceEUI:string, timestamp:number) {
        return await this.DataModel.findOneAndDelete({deviceEUI:deviceEUI, timestamp:timestamp});
    }

    public async insertDevicePerimeter(data:{deviceID:string, perimeter:number[], name:string}) {
        const Insert = new this.DevicePerimeterModel(data);
        return await Insert.save();
    }

    public async updateDevicePerimeterName(data:{name:string, newName:string}) {
        return await this.DevicePerimeterModel.updateMany({name:data.name}, { $set: { name:data.newName } }).exec()   
    }

    public async updateDevicePerimeter(data:{perimeter:number[], name:string}) {
        return await this.DevicePerimeterModel.updateMany({name:data.name}, { $set: { perimeter:data.perimeter } }).exec 
    } 
}
