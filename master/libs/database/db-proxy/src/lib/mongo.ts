import { Injectable, Logger } from "@nestjs/common";
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

    public override async saveRSSIinfos(data: { timestamp: number, deviceEUI: string, data: string, eventtype: string }) {
        //console.log("Insert Raw:\n");
        //console.table(data);
        const Insert = new this.DataModel(data);
        return await Insert.save();
    }

    public override async fetchRSSIinfos(deviceEUI:string, numberOfRecords: number) : Promise<DataInput[]> {
        Logger.log(`Fetch ${numberOfRecords}\n`);
        // return await this.DataModel.find({deviceEUI:deviceEUI}).sort({timestamp:-1}).limit(numberOfRecords).exec();
        return this.DataModel.find().exec();
    }
}
