import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { rssiData, RSSIdataDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(rssiData.name) private rssiDataModel: Model<RSSIdataDocument>) {}

    async insertRecord() : Promise<boolean> {}

    async removeDeviceRecords() : Promise<boolean> {}

    async removeDeviceRecordWithTimestamp() : Promise<boolean> {}

    async readDeviceRecords() : Promise<rssiData[]> {}
}


