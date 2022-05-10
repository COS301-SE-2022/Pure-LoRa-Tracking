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
      this.http.post("localhost:3333/api/map/reserve",{"token":token,"reserveID":reserveID}).subscribe(val=>{
        console.log(val);
        res(val)
      });
    })
  }
  
}
