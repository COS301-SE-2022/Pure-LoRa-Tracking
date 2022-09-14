import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'master-pure-lora-ngx-graph',
  templateUrl: './pure-lora-ngx-graph.component.html',
  styleUrls: ['./pure-lora-ngx-graph.component.scss']
})
export class PureLoraNgxGraphComponent implements OnInit {

  graphOption = new FormControl();
  // view: [number,number]= [400, 200];

  // options
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Beats Per Minute (bpm)';
  timeline = true;
  yScaleMin = 0;
  graphdata=null;

  @Input() type:string;


  constructor() {
    this.type="";
   }

  ngOnInit(): void {

  }   

}
