import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'master-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
})
export class ManagePageComponent implements OnInit{
  manageCase = "profile";
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(['manage',{outlets:{managecontent:['profile']}}]);   
  }
  
}
