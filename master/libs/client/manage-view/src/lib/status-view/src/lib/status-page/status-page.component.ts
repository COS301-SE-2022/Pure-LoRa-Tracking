import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface ExternalServices {
  name: string,
  status: boolean,
  link?: string,
}

@Component({
  selector: 'master-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.scss'],
})
export class StatusPageComponent implements OnInit {
  externalServices: ExternalServices[] = [];
  constructor(private http: HttpClient) {
    console.log("placeholder");
  }
  timeLeft = 10;
  ngOnInit(): void {
    this.reload();
    // this.reload();
    // setInterval(() => {
    //   this.timeLeft--;
    //   if (this.timeLeft <= 0) {
    //     this.timeLeft = 10;
    //   }
    // }, 1000) to many requests for now
  }

  reload() {
    this.http.get("/health/checksystems").subscribe((data: any) => {
      const temp: ExternalServices[] = [];
      for (const key in data.details) {
        if (Object.prototype.hasOwnProperty.call(data.details, key)) {
          const element = data.details[key];
          const newkey = JSON.parse(key);
          if (newkey.url == undefined) {
            temp.push({
              name: newkey.name,
              status: element.status == "up",
            });
          } else {
            temp.push({
              name: newkey.name,
              status: element.status == "up",
              link: newkey.url
            });
          }
        }
      }
      this.externalServices = temp;
    })
  }



 

}
