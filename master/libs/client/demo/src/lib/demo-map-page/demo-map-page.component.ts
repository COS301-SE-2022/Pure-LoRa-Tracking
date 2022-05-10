/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-demo-map-page',
  templateUrl: './demo-map-page.component.html',
  styleUrls: ['./demo-map-page.component.scss'],
})
export class DemoMapPageComponent implements OnInit {
  Reserve:any= {
    code : 200,
    status : "success",
    explanation : "",
    data : {
        reserveName : "UP",
        center : {
            latitude : "-25.755123",
            longitude : "28.231999"
        },
        location : [
            {
                latitude : "-25.753785",
                longitude : "28.231703"
            },
            {
                latitude : "-25.755650",
                longitude : "28.230737"
            },
            {
                latitude : "-25.757089",
                longitude : "28.233456"
            },
            {
                latitude : "-25.756385",
                longitude : "28.236474"
            },
            {
                latitude : "-25.754765",
                longitude : "28.235663"
            }
        ]
    }
}
  constructor() {}

  ngOnInit(): void {}
}
