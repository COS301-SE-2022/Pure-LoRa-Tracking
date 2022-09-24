import { Component } from '@angular/core';

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
export class StatusPageComponent{

  externalServices: ExternalServices[] = [
    {
      name: "ThingsBoard",
      status: true,
      link: "https://www.thingsboard.io"
    },
    {
      name:"Some Service",
      status:false,
    },
    {
      name:"Some Service",
      status:true,
      link:"https://www.google.com"
    },
    {
      name:"Some Service",
      status:true,
    },
    {
      name:"Some Service",
      status:true,
      link:"https://www.google.com"
    },
    {
      name:"Some Service",
      status:true,
    },
    {
      name:"Some Service",
      status:true,
    },
    {
      name:"Some Service",
      status:false,
      link:"https://www.google.com"
    },
  ];

}
