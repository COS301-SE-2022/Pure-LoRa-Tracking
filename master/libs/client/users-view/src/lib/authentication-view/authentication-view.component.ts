import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
@Component({
  selector: 'master-authentication-view',
  templateUrl: './authentication-view.component.html',
  styleUrls: ['./authentication-view.component.scss'],
})
export class AuthenticationViewComponent implements OnInit {

  twofactorgroup:UntypedFormGroup;
  querytoken:string;

  constructor(private fb:UntypedFormBuilder, private router:Router,private activatedRoute:ActivatedRoute,private http:HttpClient,private cookieservice:CookieService, private snackbar:MatSnackBar) {
    this.querytoken="";
    this.activatedRoute.queryParamMap.subscribe((params)=>{
      this.querytoken=atob(params.get("token") || "");
    })
    this.twofactorgroup=this.fb.group({
      authcode:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log("auth");
  }
  
  auth():void{
    console.log("");
    this.http.post("api/login/2faCheck",{
      token:this.querytoken,
      authcode:this.twofactorgroup.get("authcode")?.value
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.status==200&&val.explain=="call finished"){
        this.cookieservice.set("PURELORA_TOKEN",val.token,14);
        this.cookieservice.set("PURELORA_REFRESHTOKEN",val.refreshToken,14);
        this.router.navigate(["reserve"]);
      } else {
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['orange-snackbar'], data: {message:"Authentication Failed", icon:"cancel"}});
      }

      // else if(val){

      // }
    })
  }

}
