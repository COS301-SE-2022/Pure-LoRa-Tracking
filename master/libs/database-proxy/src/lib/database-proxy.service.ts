import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { rssiData, RSSIdataDocument } from '../database-interfaces.interface';

@Injectable()
export class DatabaseProxyService {
    constructor(@InjectModel(rssiData.name) private rssiDataModel: Model<RSSIdataDocument>) {}

    async insertRecord() : Promise<boolean> {return null}

    async removeDeviceRecords() : Promise<boolean> {return null}

    async removeDeviceRecordWithTimestamp() : Promise<boolean> {return null}

    async readDeviceRecords() : Promise<rssiData[]> {return null}
}


