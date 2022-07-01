import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataInput, InputDataDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(DataInput.name) private DataModel: Model<InputDataDocument>) {}

    insertLocation(dataToInsert : DataInput) {
        const Insert = new this.DataModel(dataToInsert);
        return Insert.save();
    }
}
