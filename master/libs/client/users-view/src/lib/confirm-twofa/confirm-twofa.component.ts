import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'master-confirm-twofa',
  templateUrl: './confirm-twofa.component.html',
  styleUrls: ['./confirm-twofa.component.css']
})
export class ConfirmTwofaComponent implements OnInit {

  twofactorgroup:UntypedFormGroup;
  qrcodeid:string;
  rawsecret:string;

  constructor(private fb:UntypedFormBuilder, private router:Router,private activeRoute:ActivatedRoute,private http:HttpClient,private cookieservice:CookieService) {
    this.qrcodeid="";
    this.rawsecret="";
    this.activeRoute.queryParamMap.subscribe(params=>{
      this.qrcodeid=atob(params.get("link")||"");
      this.rawsecret=this.qrcodeid.substring(this.qrcodeid.indexOf("secret=")+7);
    })
    this.twofactorgroup=this.fb.group({
      authcode:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log("auth");
  }
  
  auth():void{
    const token=this.cookieservice.get("PURELORA_PREVERIFICATION_TOKEN");
    this.http.post("api/login/2faVerify",{
      token:token,
      authcode:this.twofactorgroup.get("authcode")?.value,
      authurl:this.qrcodeid 
    }).subscribe((val:any)=>{
      console.log("Val",val);
    });

    // this.router.navigate(["reserve"]);
  }


}
