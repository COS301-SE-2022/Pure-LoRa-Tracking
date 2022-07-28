import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AverageInput, AverageInputDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(AverageInput.name) private AverageModel: Model<AverageInputDocument>) {}


    /*insertLocation(dataToInsert : DataInput) {
        const Insert = new this.DataModel(dataToInsert);
        return Insert.save();
    }*/

    async insertAverageRecord(data : AverageInput) : Promise<AverageInput> {
        const Insert = new this.AverageModel(data);
        return await Insert.save();
    }

    async getAverageData(deviceID: string): Promise<AverageInput[]> {
        return this.AverageModel.find({deviceID:deviceID}).exec();
    }
}
