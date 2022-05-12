/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MapCallerService} from "@master/client/map-apicaller"
import {MapApiLatestResponse, MapApiReserveResponse} from "@master/shared-interfaces"
@Component({
  selector: 'master-demo-map-page',
  templateUrl: './demo-map-page.component.html',
  styleUrls: ['./demo-map-page.component.scss'],
})
export class DemoMapPageComponent implements OnInit {
  Reserve:MapApiReserveResponse|null= null
  Latest:MapApiLatestResponse|null=null;
  constructor(private caller:MapCallerService) {
    caller.getReserve("sf","sdf").then(val=>this.Reserve=val);
    caller.getLatest("sf","sdf").then(val=>this.Latest=val)
  }

  ngOnInit(): void {}
}
