import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'master-gateway-edit',
  templateUrl: './gateway-edit.component.html',
  styleUrls: ['./gateway-edit.component.scss'],
})
export class GatewayEditComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancelEdit():void{
    this.router.navigate(['manage',{outlets:{managecontent:['manage-devices']}}]);  
  }
}
