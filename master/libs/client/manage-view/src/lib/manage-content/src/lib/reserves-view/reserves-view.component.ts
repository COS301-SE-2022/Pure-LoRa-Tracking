import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

export interface Reserve {
  name: string;
  id: string;
}

@Component({
  selector: 'master-reserves-view',
  templateUrl: './reserves-view.component.html',
  styleUrls: ['./reserves-view.component.scss'],
})
export class ReservesViewComponent implements OnInit {
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
