import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'master-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logingroup:FormGroup;
  constructor(private fb:FormBuilder) {
    this.logingroup=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log("placeholder");
  }

}
