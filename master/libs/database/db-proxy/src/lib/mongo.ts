import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Database } from "./database";
import { AverageInput, AverageInputDocument, DataDocument, DataInput } from "./mongo-interface.interface";

/* providers are singleton by design */
@Injectable()
export class Mongo extends Database {

    constructor(@InjectModel(AverageInput.name) private AverageModel: Model<AverageInputDocument>,
        @InjectModel(DataInput.name) private DataModel: Model<DataDocument>
    ) {
        super();
    }

    public override async saveRSSIinfos(data: { timestamp: number, deviceID: string, data: string, eventtype: string }) {
        console.log("Insert Raw:\n");
        console.table(data);
        const Insert = new this.DataModel(data);
        return await Insert.save();
    }
}
