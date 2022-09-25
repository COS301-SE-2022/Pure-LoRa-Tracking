import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';


@Component({
  selector: 'master-confirm-twofa',
  templateUrl: './confirm-twofa.component.html',
  styleUrls: ['./confirm-twofa.component.css']
})
export class ConfirmTwofaComponent implements OnInit {

  twofactorgroup: UntypedFormGroup;
  qrcodeid: string;
  rawsecret: string;

  constructor(
      private fb: UntypedFormBuilder,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private http: HttpClient,
      private cookieservice: CookieService,
      private snackbar: MatSnackBar
      ) {
    this.qrcodeid = "";
    this.rawsecret = "";
    this.activeRoute.queryParamMap.subscribe(params => {
      this.qrcodeid = atob(params.get("link") || "");
      this.rawsecret = this.qrcodeid.substring(this.qrcodeid.indexOf("secret=") + 7);
    })
    this.twofactorgroup = this.fb.group({
      authcode: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {  
    console.log("auth");
  }

  auth(): void {
    const token = this.cookieservice.get("PURELORA_PREVERIFICATION_TOKEN");
    this.http.post("api/login/2faVerify", {
      token: token,
      authcode: this.twofactorgroup.get("authcode")?.value,
      authurl: this.qrcodeid
    }).subscribe((val: any) => {
      if(val.status==200&&val.explain=="call finished"){
        this.cookieservice.delete("PURELORA_PREVERIFICATION_TOKEN");
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"2FA Added, Please log in", icon:"check_circle"}});
        this.router.navigate(["/login"]);
      }
    });

    // this.router.navigate(["reserve"]);
  }


}
