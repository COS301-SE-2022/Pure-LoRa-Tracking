import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

export interface Reserve {
  name: string;
  id: string;
}

@Component({
  selector: 'master-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss'],
})
export class DevicesViewComponent implements OnInit {
  reserves:Reserve[] = [];
  reserveControl = new FormControl('');

  constructor() {
    this.reserves = [{
      name: 'Kruger Park',
      id: '123'
    },
    {
      name: 'Park 2',
      id: '12a3'
    }]
  }

  ngOnInit(): void {}
}
