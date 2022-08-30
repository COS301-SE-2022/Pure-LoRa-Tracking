import { Injectable } from "@nestjs/common";
import { Database } from "./database";
import { Mongo } from "./mongo";

@Injectable()
export class Proxy extends Database {
    constructor(private mongoDB : Mongo){super()};
    public override async saveRSSIinfos(data:{timestamp:number, deviceID:string, data:string, eventtype:string}) {
        console.log("Proxy call...")
        await this.mongoDB.saveRSSIinfos(data)
    }
}