import { Component, Input } from '@angular/core';
//import {DeviceNotifierService } from '@master/client/shared-services';

interface graphdata{
  name:Date;//this would be the timestamp, calling it name to reduce frontend overhead
  value:number;//actual data value point
}
interface gatewayData{
  graphname:string;//name of the graph, like heartrate or tempreture
  data:graphdata[];
}

@Component({
  selector: 'master-gateway-activity',
  templateUrl: './gateway-activity.component.html',
  styleUrls: ['./gateway-activity.component.scss'],
})
export class GatewayActivityComponent {

  private gatewayEUI="";
  @Input()
  public get GatewayEUI() : string {
    return this.gatewayEUI;
  }
  public set GatewayEUI(v : string) {
    this.gatewayEUI = v;
  }

  gatewaydata:gatewayData[];

  currentbardata:graphdata[]=[];

  graphdata=null;
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = '';
  timeline = true;
  yScaleMin = 0;

  constructor() {
   this.gatewaydata=this.GETDATATEMP();
  }

  GETDATATEMP():gatewayData[]{
    return [
      {
        graphname:"Signal",
        data:[
          {
            "value":15,
            "name": new Date("2020-05-12"),
          },
          {
            "value":6,
            "name": new Date("2020-05-13"),
          },
          {
            "value":5,
            "name": new Date("2020-05-14"),
          },
          {
            "value":10,
            "name": new Date("2020-05-15"),
          },
          {
            "value":9,
            "name": new Date("2020-05-17"),
          },
          {
            "value":12,
            "name": new Date("2020-05-19"),
          },
        ]
      }
    ]
  }
}
