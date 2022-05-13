import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MapCallerService {

  constructor(private http:HttpClient) { 
    //placeholder
  }

  async getReserve(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/reserve",{"token":token,"reserveID":reserveID}).subscribe(val=>{
        res(val)  
      });
    })
  }
  
  async getLatest(token:string,reserveID:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.post("/api/map/latest",{"token":token,"reserveID":reserveID}).subscribe(val=>{
        res(val)
      });
    });
  }


}
