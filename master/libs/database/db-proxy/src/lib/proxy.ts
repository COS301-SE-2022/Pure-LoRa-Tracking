import { Injectable, Logger } from "@nestjs/common";
import { Database } from "./database";
import { Mongo } from "./mongo";

@Injectable()
export class Proxy extends Database {
    constructor(private mongoDB : Mongo){super()};
    public override async saveRSSIinfos(data:{timestamp:number, deviceEUI:string, data:string, eventtype:string}) {
        console.log("Proxy call...")
        try {
            await this.mongoDB.saveRSSIinfos(data)
        } catch(error) {
            console.log(error);
        }
    }

    public override async fetchRSSIinfos(deviceEUI:string, numberOfRecords: number) {
        Logger.log("Proxy call...");
        try {
            return await this.mongoDB.fetchRSSIinfos(deviceEUI, numberOfRecords);
        } catch(error) {
            Logger.warn(error)
        }
    }
}