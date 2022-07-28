import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MapCallerService {

  constructor(private http:HttpClient) { 
    //placeholder
  }

  getReserve():Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/reserve",{}).subscribe(val=>{
        res(val)  
      });
    })
  }
  
  getLatest(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/latest",{"token":token,"reserveID":reserveID}).subscribe(val=>{
        res(val)
      });
    });
  }

  getHistorical(token:string,reserveID:string,deviceID:string[]):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/historical",{"token":token,"reserveID":reserveID,"deviceID":deviceID}).subscribe(val=>{
        res(val);
      });
    })
  }

  getHistoricalWithTime(token:string,reserveID:string,deviceID:string[],startTime:number,endTime:number):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/historical",{"token":token,"reserveID":reserveID,"deviceID":deviceID,"startTime":startTime,"endTime":endTime}).subscribe(val=>{
        res(val);
      });
    })
  }
  
  getGateways(custid:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/device/gateway/info",{"customerID":custid}).subscribe((val:any)=>{
        
        if(val.status!=200) return res([]);
        this.http.post("/api/device/gateway/info/location",{deviceIDs:val.data.map((curr:any)=>curr.deviceID)}).subscribe((other:any)=>{
          // console.log('other :>> ', other);
          const toreturn=val.data.map((othercurr:any)=>{
            return {
              deviceID:othercurr.deviceID,
              deviceName:othercurr.deviceName,
              humanName:othercurr.humanName,
              location:other.data.find((devid:any)=>devid.deviceID==othercurr.deviceID)?.location
            }
          })
          res(toreturn);
        })
      });
    })
  }

  removeDevice(inputid:string,inputeui:string,isGateway:boolean):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/device/delete",{
        deviceID: inputid,
        isGateway: isGateway,
        devEUI: inputeui
      }).subscribe(val=>{
        res(val);
      })
    })
  }
  

}
