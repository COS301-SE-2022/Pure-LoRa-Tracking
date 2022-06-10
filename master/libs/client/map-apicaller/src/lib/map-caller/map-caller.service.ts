import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MapCallerService {

  constructor(private http:HttpClient) { 
    //placeholder
  }

  getReserve(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/reserve",{"token":token,"reserveID":reserveID}).subscribe(val=>{
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
        res(val)  
      });
    })
  }
  
  getGateways(token:string,custid:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/device/gateway/info",{"token":token,"customerID":custid}).subscribe(val=>{
        res(val)  
      });
    })
  }

  removeDevice(token:string,inputid:string,inputeui:string,isGateway:boolean):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/device/remove",{
        token: token,
        deviceID: inputid,
        isGateway: isGateway,
        devEUI: inputeui
      }).subscribe(val=>{
        res(val);
      })
    })
  }
  

}
