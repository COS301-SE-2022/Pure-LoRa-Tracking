import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface ReserveDetails{
  name:string;
  id:string;
}
@Component({
  selector: 'master-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {



  userInfo: FormGroup = new FormGroup({});

  reservesList:ReserveDetails[] = [];
  id:string|null;
  name:string="";
  surname:string="";
  email:string="";
  selected:string[]=[];
  constructor(private activeRoute:ActivatedRoute,private formBuilder: FormBuilder, private router:Router,private http:HttpClient) {
    this.id="";
  }

  ngOnInit(): void {
    this.userInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      surname: [null,[Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      reserves: [null,[Validators.required]]
    });

    this.activeRoute.paramMap.subscribe( params => { 
      this.id = params.get('id');
      console.log(this.id)
    });

    this.http.post("api/user/info",{
      userID:this.id
    }).subscribe((val:any)=>{
      this.userInfo.get("name")?.setValue(val.data.firstName);
      this.userInfo.get("surname")?.setValue(val.data.lastName);
      this.userInfo.get("email")?.setValue(val.data.email);
      this.userInfo.get("reserves")?.setValue(val.data.additionalInfo.reserves?.map((curr:any)=>curr.reserveID));
    });

    this.http.post("api/user/admin/groups",{}).subscribe((val:any)=>{
      if(val.status==200){
        this.reservesList=val.data.data.map((curr:any)=>{
          return {
            name:curr.name,
            id:curr.id.id
          }
        })
      }else{
        alert("Something went wrong, please contact an administrator");
      }
    })
  }

  saveUser(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
    this.http.post("/api/user/info/details",{
      userID:this.id,
      userInfo: {
        firstName:this.userInfo.get("name")?.value,
        lastName:this.userInfo.get("surname")?.value
      }
    }).subscribe((val:any)=>{
      console.log(val);
    });
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['users']}}]);   
  }
}
