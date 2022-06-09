import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DialogConfirmationComponent } from '@master/client/shared-ui/components-ui';

export interface userInfo{
  name: string,
  surname: string,
  id: string,
  email: string,
  status: boolean,
  accountEnabled:boolean
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
  sourceData:Array<userInfo>=[];
  currentid="";
  canadd=false;
  token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImM1M2ZlNDAwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImIwMTNhOWUwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1NDgwMDc2NiwiZXhwIjoxNjU0ODA5NzY2fQ.J35LmjtyNZlydD5sYjHsThPr_Z1G-hz1PUwObeual8OMC1M9_fx3J_e1oFNh-iCXl0zblw3yJ6fcgqRwS25_Mw"
  constructor(private _formBuilder: FormBuilder,private http:HttpClient,public confirmDialog: MatDialog) {
  }

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
      "token":this.token
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
        "token":this.token,
        "customerID":userinput
      }).subscribe((val:any)=>{
        console.log(val)
        this.sourceData=val.data.data.map((curr:any)=>({
          email:curr.email,
          id:curr.id.id,
          name:curr.firstName,
          surname:curr.lastName,
          status:curr.additionalInfo!=undefined?curr.additionalInfo.userCredentialsEnabled:false,
          accountEnabled:curr.additionalInfo!=undefined
        } as userInfo)) as Array<userInfo>
        this.currentid=userinput;
        this.canadd=true;
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
      this.http.post("api/user/admin/add",{
        token:this.token,
        customerID:this.currentid,
        userInfo:{
          email:this.emailGroup.get("emailControl")?.value,
          firstName:this.nameGroup.get("nameControl")?.value,
          lastName:this.surnameGroup.get("surnameControl")?.value
        }
      }).subscribe((curr)=>{
        console.log(curr);
      })

    }
    
  }
  confirmDelete(userId:string):void{
    this.confirmDialog.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to delete user: '+userId+'?',
      },

    });
  
    this.http.post("api/user/admin/remove",{
      token:this.token,
      userID:userId
    }).subscribe(val=>{
      console.log(val);
    })

  }

  confirmSwitch(userId:string,currval:boolean):void{
    this.confirmDialog.open(DialogConfirmationComponent,{ data: {
      title: 'Confirm changing status.',
      dialogMessage: 'Are you sure you want to change the status of the user: '+userId+'?',
    }});

    if(!currval){
      this.http.post('api/user/admin/disable',{
        token:this.token,
        userID:userId
      }).subscribe(val=>{
        console.log(val);
      });
    }else {
      this.http.post('api/user/admin/enable',{
        token:this.token,
        userID:userId
      }).subscribe(val=>{
        console.log(val);
      });
    }

  }


}