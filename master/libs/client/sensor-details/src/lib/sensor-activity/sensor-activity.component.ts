import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'master-sensor-activity',
  templateUrl: './sensor-activity.component.html',
  styleUrls: ['./sensor-activity.component.scss'],
})
export class SensorActivityComponent implements OnInit {

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

  signalData = [
    {
      "value":15,
      "name": "12/05/2020"
    },
    {
      "value":6,
      "name": "13/05/2020"
    },
    {
      "value":5,
      "name": "14/05/2020"
    },
    {
      "value":10,
      "name": "15/05/2020"
    },
    {
      "value":9,
      "name": "16/05/2020"
    },
    {
      "value":12,
      "name": "17/05/2020"
    },
  ];

  tempData = [{
    "name":"averagetemp",
    "series": [
    {
      "name": "12/05/2020",
      "value":"23"
    },
    {
      "name": "13/05/2020",
      "value":"23"
    },
    {
      "name": "14/05/2020",
      "value":"24"
    },
    {
      "name": "17/05/2020",
      "value":"23",
    },
    {
      "name": "15/05/2020",
      "value":"16"
    },
    {
      "name": "16/05/2020",
      "value":"0",
    },
  ]}];

  bpmData = [{
    "name":"averagebpm",
    "series":[
    {
      "value":26,
      "name": "12/05/2020"
    },
    {
      "value":28,
      "name": "13/05/2020"
    },
    {
      "value":29,
      "name": "14/05/2020"
    },
    {
      "value":28,
      "name": "15/05/2020"
    },
    {
      "value":14,
      "name": "16/05/2020"
    },
    {
      "value":0,
      "name": "17/05/2020"
    },
  ]}];

  constructor() {}

  ngOnInit(): void {}

  
}
