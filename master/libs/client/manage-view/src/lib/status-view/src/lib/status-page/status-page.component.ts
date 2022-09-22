import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface ExternalServices{
  name:string,
  status:boolean,
  link?:string,
}

@Component({
  selector: 'master-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.scss'],
})
export class StatusPageComponent implements OnInit {
  constructor(private http:HttpClient){
    console.log("placeholder");
  }
  timeLeft=10;
  ngOnInit(): void {
    this.reload();
    setInterval(()=>{
      this.timeLeft--;
      if(this.timeLeft<=0){
        this.timeLeft=10;
        this.reload();
      }
    },1000)
  }

  reload(){
    this.http.get("/health/checksystems").subscribe((data:any)=>{
      const temp:ExternalServices[]=[];
      for (const key in data.details) {
        if (Object.prototype.hasOwnProperty.call(data.details, key)) {
          const element = data.details[key];
          temp.push({
            name:key,
            status:element.status=="up",
          });
        }
      }
      this.externalServices=temp;
    })
  }



  externalServices: ExternalServices[] = [];

}
