import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'master-profile-edit',
  templateUrl: './edit-profile-view.component.html',
  styleUrls: ['./edit-profile-view.component.scss'],
})
export class EditProfileViewComponent implements OnInit {
  editProfile: FormGroup = new FormGroup({});


  emailControl = new FormControl('',[Validators.required, Validators.email]);

  constructor(private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.editProfile = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      surname: [null,Validators.required, Validators.minLength(2)],
      email: [null, Validators.required, Validators.email]
    });
  }

  saveProfile(form:any):void {
console.log(JSON.stringify(form.value,null,6));
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['profile']}}]);   
  }
}
