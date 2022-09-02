export class Database {
    public saveRSSIinfos?(data:{timestamp:number, deviceEUI:string, data:string, eventtype:string});
    public fetchRSSIinfos?(deviceEUI:string, numberOfRecords: number);
}




