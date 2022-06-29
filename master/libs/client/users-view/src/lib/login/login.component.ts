import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'master-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logingroup:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private cookieservice:CookieService) {
    this.logingroup=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    console.log("placeholder");
    
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

        }
      });
    }
  }

}
