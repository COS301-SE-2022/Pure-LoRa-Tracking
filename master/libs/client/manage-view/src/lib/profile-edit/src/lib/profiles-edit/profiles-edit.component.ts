import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';

@Component({
  selector: 'master-profiles-edit',
  templateUrl: './profiles-edit.component.html',
  styleUrls: ['./profiles-edit.component.scss'],
})

export class ProfilesEditComponent implements OnInit {

  editProfile: UntypedFormGroup = new UntypedFormGroup({});
  emailControl = new UntypedFormControl('',[Validators.required, Validators.email]);
  id="";
  constructor(private formBuilder: UntypedFormBuilder, private router:Router,private http:HttpClient,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.http.post("api/user/info",{}).subscribe((val:any)=>{
      this.editProfile.setValue({
        name:val.data.firstName,
        surname:val.data.lastName,
        email:val.data.email
      })
      this.id=val.data.id.id;
    })

    this.editProfile = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      surname: [null,[Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]]
    });

  }

  saveProfile(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
    this.http.post("/api/user/info/details",{
      userID:this.id,
      userInfo: {
        firstName:this.editProfile.get("name")?.value,
        lastName:this.editProfile.get("surname")?.value,
        email:this.editProfile.get("email")?.value
      }
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.status==200&&val.explain=="call finished"){
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"User Updated", icon:"check_circle"}});
        this.navigateBack();
      }
    });
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['profile']}}]);   
  }
}
