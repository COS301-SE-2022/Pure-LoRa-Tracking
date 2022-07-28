import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Reserve {
  name: string;
  id: string;
  email:string;
}

@Component({
  selector: 'master-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss'],
})
export class ReserveDetailComponent implements OnInit {
  reserves: Reserve[] = [];


  constructor(private router: Router, private http: HttpClient) {
    this.reserves = []
  }

  ngOnInit(): void {
    console.log("reserves");
    this.http.post("api/user/admin/groups", {

    }).subscribe((val: any) => {
      console.log(val.data.data)
      if (val.status == 200) {
        this.reserves = val.data.data.map((curr: any) => { return {
          name:curr.name,
          id:curr.id.id,
          email:curr.email
        } })
      }
      else {
        alert("Something went wrong, please contact an administrator");
      }
    })
  }

  openCreateReserve(): void {
    this.router.navigate(['manage', { outlets: { managecontent: ['reserve-create'] } }]);
  }

  deleteReserve(id: string): void {
    console.log(id);
    this.http.post("/api/reserve/remove",{
      reserveID:id
    }).subscribe(val=>{
      console.log("value after delete",val);
    })
  }

  editReseve(id: string): void {
    this.router.navigate(['manage', { outlets: { managecontent: ['reserve-edit', id,this.reserves.find(curr=>curr.id==id)?.email,this.reserves.find(curr=>curr.id==id)?.name] } }]);
  }
}
