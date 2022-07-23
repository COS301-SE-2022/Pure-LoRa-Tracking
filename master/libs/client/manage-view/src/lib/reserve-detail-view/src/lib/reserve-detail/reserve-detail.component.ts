import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router:Router) {
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

  openCreateReserve():void {
    this.router.navigate(['manage',{outlets:{managecontent:['reserve-create']}}]);  
  }

  deleteReserve(id:string):void{
    console.log(id);
  }

  editReseve(id:string):void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserve-edit',id]}}]);  
  }
}
