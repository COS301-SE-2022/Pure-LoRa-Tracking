import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'master-confirm-twofa',
  templateUrl: './confirm-twofa.component.html',
  styleUrls: ['./confirm-twofa.component.css']
})
export class ConfirmTwofaComponent implements OnInit {

  twofactorgroup:UntypedFormGroup;
  
  constructor(private fb:UntypedFormBuilder, private router:Router) {
    this.twofactorgroup=this.fb.group({
      authcode:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log("auth");
  }
  
  auth():void{
    this.router.navigate(["reserve"]);
  }


}
