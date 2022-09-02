import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AverageInput, AverageInputDocument, DataDocument, DataInput } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(AverageInput.name) private AverageModel: Model<AverageInputDocument>,
        @InjectModel(DataInput.name) private DataModel: Model<DataDocument>
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
}
