import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-sensor-activity',
  templateUrl: './sensor-activity.component.html',
  styleUrls: ['./sensor-activity.component.scss'],
})
export class SensorActivityComponent implements OnInit {

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
  yAxisLabel = 'Heart Rate (bpm)';
  timeline = true;
  yScaleMin = 0;

  constructor() {}

  ngOnInit(): void {}

  
}
