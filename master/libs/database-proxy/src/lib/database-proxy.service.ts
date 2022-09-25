import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AverageInput, AverageInputDocument, DataDocument, DataInput, ReadyProcess, ReadyProcessDocument, DevicePerimeter, DevicePerimeterDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(
        @InjectModel(AverageInput.name) private AverageModel: Model<AverageInputDocument>,
        @InjectModel(DataInput.name) private DataModel: Model<DataDocument>,
        @InjectModel(ReadyProcess.name) private ReadyModel: Model<ReadyProcessDocument>,
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

    public async saveRSSIinfos(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string, processed: false }) {
        //console.log("Insert Raw:\n");
        //console.table(data);
        const transfer = data;
        const Insert = new this.DataModel(data);
        return await Insert.save();
    }

    public async fetchRSSIinfos(deviceEUI: string, numberOfRecords: number): Promise<DataInput[]> {
        Logger.log(`Fetch ${numberOfRecords}\n`);
        const data = await this.DataModel.find({ deviceEUI: deviceEUI, processed: false }).sort({ timestamp: 1 }).limit(numberOfRecords).exec();
        const res = new Array<DataInput>();
        data.forEach(item => {
            res.push({
                data: item.data,
                deviceEUI: item.deviceEUI,
                eventtype: item.eventtype,
                timestamp: item.timestamp,
                processed: item.processed
            })
        })
        return res;
    }

    public async markAsProcessed(data: { deviceEUI: string, timestamp: string }[]): Promise<void> {
        data.forEach(async (curr) => {
            // await this.DataModel.find({deviceEUI:curr.deviceEUI,timestamp:curr.timestamp}).set({processed:true});
            await this.DataModel.findOneAndUpdate({ deviceEUI: curr.deviceEUI, timestamp: curr.timestamp }, { processed: true });

        })
        return;
    }

    public async deleteDeviceData(deviceEUI: string, timestamp: number) {
        return await this.DataModel.findOneAndDelete({ deviceEUI: deviceEUI, timestamp: timestamp });
    }

    public async addToReady(data:{deviceEUI:string,timestamp:number,data:string}){
        const Insert=new this.ReadyModel(data);
        return await Insert.save();
    }

    public async checkNumReady(deviceEUI:string){
        return await this.ReadyModel.find({deviceEUI:deviceEUI}).count();
    }

    public async getLatestReady(deviceEUI:string){
        const data=await this.ReadyModel.find({deviceEUI:deviceEUI}).sort({timestamp:1}).limit(1).exec();
        return data.at(0);
    }

    public async deleteReadyAt(objectID:string){
        return await this.ReadyModel.findByIdAndDelete(objectID);
    }

    public async insertDevicePerimeter(data:{deviceID:string, perimeter:number[], name:string}) {
        const Insert = new this.DevicePerimeterModel(data);
        return await Insert.save();
    }

    public async removeDeviceFromPerimeter(data:{deviceID:string}) {
        await this.DevicePerimeterModel.deleteOne({deviceID:data.deviceID});
    }

    public async updateDevicePerimeterName(data:{name:string, newName:string}) {
        this.DevicePerimeterModel.updateMany({name:data.name}, { $set: { name:data.newName } }).exec()   
    }

    public async updateDevicePerimeter(data:{perimeter:number[], name:string}) {
        this.DevicePerimeterModel.updateMany({name:data.name}, { $set: { perimeter:data.perimeter} }).exec 
    } 

    public async getDevicePerimeter(deviceID:string) : Promise<DevicePerimeter> {
        return await this.DevicePerimeterModel.findOne({deviceID:deviceID})
    }
}
