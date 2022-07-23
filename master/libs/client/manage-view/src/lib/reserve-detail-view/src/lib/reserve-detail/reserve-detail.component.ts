import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

export interface Reserve {
  name: string;
  id: string;
}

@Component({
  selector: 'master-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss'],
})
export class ReserveDetailComponent implements OnInit {
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
