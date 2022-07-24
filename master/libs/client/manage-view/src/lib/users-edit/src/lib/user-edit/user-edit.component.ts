import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'master-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  userInfo: FormGroup = new FormGroup({});

  reservesList = [{name:"R1", id:"1"},{name:"R2", id:"2"},{name:"R3", id:"3"},{name:"R4", id:"4"}];

  constructor(private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.userInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      surname: [null,[Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      reserves: [null,[Validators.required]]
    });
  }

  saveUser(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['users']}}]);   
  }
}
