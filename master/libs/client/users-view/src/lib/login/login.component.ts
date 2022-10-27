import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
@Component({
  selector: 'master-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logingroup: UntypedFormGroup;

  responseMessage = "\n";

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private cookieservice: CookieService,
    private router: Router,
    private snackbar: MatSnackBar) {
    this.logingroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    //check if there is a valid refresh token
    if (this.cookieservice.check("PURELORA_TOKEN") && this.cookieservice.check("PURELORA_REFRESHTOKEN")) {
      this.http.post("api/login/refreshTokenLogin", {
        token: this.cookieservice.get("PURELORA_TOKEN"),
        refreshToken: this.cookieservice.get("PURELORA_REFRESHTOKEN")
      }).subscribe((val: any) => {
        if (val.status == 200 && val.explain == "Login successful.") {
          //set cookies
          this.cookieservice.set("PURELORA_TOKEN", val.token, 14);
          this.cookieservice.set("PURELORA_REFRESHTOKEN", val.refreshToken, 14);
          this.router.navigate(["reserve"]);
        }
      })
    }

  }

  //handle login logic
  login():void{
    console.log("Triggered");
    if(this.logingroup.valid){
      this.http.post("api/login/user",({
        username:this.logingroup.get("email")?.value,
        password:this.logingroup.get("password")?.value
      })).subscribe((val:any)=>{

        console.log(val);
        if (val.status == 401 && val.explain == "Invalid username or password") {
          this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 3000, panelClass: ['orange-snackbar'], data: {message:"Username or password incorrect", icon:"error_outline"}})
        }
        else {
          if (val.enabled2fa == true) {
            if (val.status == 200 && val.explain == "Login failed. No 2fa") {
              this.cookieservice.set("PURELORA_PREVERIFICATION_TOKEN", val.token, 14);
              this.router.navigate(["twofa"], { queryParams: { link: btoa(val.authURL) } });
            }
            else if (val.status == 200 && val.explain == "Login successful. 2fa") {
              this.router.navigate(["auth"], { queryParams: { token: btoa(val.token) } });
            }
          }
          else {
            if (val.status == 200 && val.explain == "Login successful. 2fa not enabled") {
              this.cookieservice.set("PURELORA_TOKEN", val.token, 14);
              this.cookieservice.set("PURELORA_REFRESHTOKEN", val.refreshToken, 14);
              this.router.navigate(["reserve"]);
            }
          }
        }
      });
    } else {
      this.responseMessage = this.logingroup.controls['email'].invalid ? 'Please enter a valid e-mail address.' : (this.logingroup.controls['password'].invalid) ? 'Please enter a password.' : '\n';
    }

  }

  reset(): void {
    this.http.post("api/reset",{
      email:this.logingroup.get("email")?.value
    }).subscribe((val:any)=>{
      if(val.status==200&&val.explain=="reset attempt"){
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 3000, panelClass: ['green-snackbar'], data: {message:"Reset email sent", icon:"check_circle"}})
      }
      else{
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 3000, panelClass: ['red-snackbar'], data: {message:"Something went wrong, please contact an admin for help.", icon:"error_outline"}})
      }
    })
  }


}
