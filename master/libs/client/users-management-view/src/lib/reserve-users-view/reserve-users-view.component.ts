import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
export interface userInfo{
  name: string,
  surname: string,
  id: string,
  email: string,
  status: boolean,
}

export interface SingleGroup{
  name:string,
  customerid:string
}
@Component({
  selector: 'master-reserve-users-view',
  templateUrl: './reserve-users-view.component.html',
  styleUrls: ['./reserve-users-view.component.scss'],
})
export class ReserveUsersViewComponent implements OnInit {
    
  tableColumns:string[] = ['id', 'surname', 'name','email',"status","delete"];
  addUser= false;
  
  nameGroup!: FormGroup;
  surnameGroup!: FormGroup;
  emailGroup!: FormGroup;
  groups:Array<SingleGroup>=[];
  sourceData:Array<userInfo>=[]

  constructor(private _formBuilder: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.nameGroup = this._formBuilder.group({
      nameControl: ['', Validators.required],
    });
    this.surnameGroup = this._formBuilder.group({
      surnameControl: ['', Validators.required],
    });
    this.emailGroup = this._formBuilder.group({
      emailControl: ['', [Validators.required,Validators.email]],
    });

    this.http.post("api/user/admin/groups",{
      "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImM1M2ZlNDAwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImIwMTNhOWUwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1NDc4OTY4MCwiZXhwIjoxNjU0Nzk4NjgwfQ.MwlaH8vmDqSTmWY9y3I8J01pDbOwMuppzoGXIXNjLWCsJYLVLltxSSXmHeVyNJxeJltBaGwpnYoxGWHd5mTW5g"
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.data.length>0){
        this.groups=val.data.map((curr:any)=>({
          name:curr.title,
          customerid:curr.id.id
        } as SingleGroup)) as Array<SingleGroup>
      }
    })
  }

  removeUser(userId:string): void {
    console.log(userId);
  }

  changeUserStatus(userId:string): void {
      console.log(userId);
    
  }

  changeGroup(userinput:string){
    if(userinput!=""){
      this.http.post("api/user/admin/reserve/all",{
        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImM1M2ZlNDAwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImIwMTNhOWUwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1NDc4OTY4MCwiZXhwIjoxNjU0Nzk4NjgwfQ.MwlaH8vmDqSTmWY9y3I8J01pDbOwMuppzoGXIXNjLWCsJYLVLltxSSXmHeVyNJxeJltBaGwpnYoxGWHd5mTW5g",
        "customerID":userinput
      }).subscribe((val:any)=>{
        console.log(val)
        this.sourceData=val.data.data.map((curr:any)=>({
          email:curr.email,
          id:curr.customerId.id,
          name:curr.firstName,
          surname:curr.lastName,
          status:curr.additionalInfo.userCredentialsEnabled
        } as userInfo)) as Array<userInfo>
        console.log(this.sourceData)
      })
    }
  }
  
  openUserForm(): void {
    this.addUser = !this.addUser;
  }

  // export interface userAddInput {
  //   token: string;
  //   customerID : string;
  //   userInfo: {
  //     email: string;
  //     firstName: string;
  //     lastName: string;
  //   };
  // }
  addUserToDB(){
    if(this.nameGroup.valid&&this.emailGroup.valid&&this.surnameGroup.valid){
      console.log(this.emailGroup.get("emailControl")?.value)


    }
  }

}
