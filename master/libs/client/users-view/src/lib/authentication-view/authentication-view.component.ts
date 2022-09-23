import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'master-authentication-view',
  templateUrl: './authentication-view.component.html',
  styleUrls: ['./authentication-view.component.scss'],
})
export class AuthenticationViewComponent implements OnInit {

  twofactorgroup:UntypedFormGroup;
  
  constructor(private fb:UntypedFormBuilder, private router:Router) {
    this.twofactorgroup=this.fb.group({
      authcode:['',[Validators.required, Validators.pattern(/^(\d |\w){1}$/), Validators.maxLength(1)]]
    })
  }

  ngOnInit(): void {
    console.log("auth");
  }
  
  auth():void{
    this.router.navigate(["reserve"]);
  }

}
