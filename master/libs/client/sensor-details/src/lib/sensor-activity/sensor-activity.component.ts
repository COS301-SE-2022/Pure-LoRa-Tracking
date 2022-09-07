import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'master-sensor-activity',
  templateUrl: './sensor-activity.component.html',
  styleUrls: ['./sensor-activity.component.scss'],
})
export class SensorActivityComponent {

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


  // TODO @MildogMiller for timeseries name must be valid js date object
  signalData = [
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
  ];

  tempData = [{
    "name":"averagetemp",
    "series": [
    {
      "name": new Date("2020-05-12"),
      "value":23.1
    },
    {
      "name": new Date("2020-05-13"),
      "value":23.2
    },
    {
      "name": new Date("2020-05-14"),
      "value":24
    },
    {
      "name": new Date("2020-05-15"),
      "value":23.4,
    },
    {
      "name": new Date("2020-05-17"),
      "value":22.9
    },
    {
      "name": new Date("2020-05-20"),
      "value":23.6,
    },
  ]}];

  bpmData = [{
    "name":"averagebpm",
    "series":[
    {
      "value":26,
      "name": new Date("2020-05-12"),
    },
    {
      "value":28,
      "name": new Date("2020-05-13"),
    },
    {
      "value":29,
      "name": new Date("2020-05-15"),
    },
    {
      "value":28,
      "name": new Date("2020-05-17"),
    },
    {
      "value":14,
      "name": new Date("2020-05-20"),
    },
    {
      "value":0,
      "name": new Date("2020-05-22"),
    },
  ]}];  
}
