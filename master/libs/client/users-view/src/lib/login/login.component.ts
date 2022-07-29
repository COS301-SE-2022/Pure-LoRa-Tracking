import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'master-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logingroup:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private cookieservice:CookieService,private router:Router) {
    this.logingroup=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    //check if there is a valid refresh token
    if(this.cookieservice.check("PURELORA_TOKEN")&&this.cookieservice.check("PURELORA_REFRESHTOKEN")){
      this.http.post("api/login/refreshTokenLogin",{
        token:this.cookieservice.get("PURELORA_TOKEN"),
        refreshToken:this.cookieservice.get("PURELORA_REFRESHTOKEN")
      }).subscribe((val:any)=>{
        if(val.status==200&&val.explain=="Login successful."){
          //set cookies
          this.cookieservice.set("PURELORA_TOKEN",val.token,14);
          this.cookieservice.set("PURELORA_REFRESHTOKEN",val.refreshToken,14);
          this.router.navigate(["reserve"]);
        }
      })
    }

  }

  //handle login logic
  login():void{
    if(this.logingroup.valid){
      this.http.post("api/login/user",({
        username:this.logingroup.get("email")?.value,
        password:this.logingroup.get("password")?.value
      })).subscribe((val:any)=>{
        if(val.status==200&&val.explain=="Login successful."){
          //set cookies
          this.cookieservice.set("PURELORA_TOKEN",val.token,14);
          this.cookieservice.set("PURELORA_REFRESHTOKEN",val.refreshToken,14);
          this.router.navigate(["reserve"]);
        }
      });
    }
    
  } 
  
  reset():void{
      console.log("reset");
  }

}
