import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DialogConfirmationComponent, SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    
  tableColumns:string[] = ['id', 'surname', 'name','email',"status","delete","edit"];
  addUser= false;
  
  nameGroup!: FormGroup;
  surnameGroup!: FormGroup;
  emailGroup!: FormGroup;
  reserveGroup!: FormGroup;
  groups:Array<SingleGroup>=[];
  sourceData:Array<userInfo>=[];
  currentid="";
  canadd=false;
  // token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ4MDU3NzUsImV4cCI6MTY1NDgxNDc3NX0.76eRuu1QDS4QLxUVuJNcawQkpyMoXezGuRfPiVMhLnDHxtxwUQqtIrnbEeLBMkVITbwjYhozU6zOyQaRiW2ajA"
  assignedReserves= new FormControl();
  
  constructor(private _formBuilder: FormBuilder,private http:HttpClient,public confirmDialog: MatDialog, private router:Router,private snackbar:MatSnackBar) {
   
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
    this.reserveGroup = this._formBuilder.group({
      reserveControl: ['',Validators.required],
    })

    this.sourceData=[];

    this.http.post("api/user/admin/groups",{
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.data.data.length>0){
        this.groups=val.data.data.map((curr:any)=>({
          name:curr.title,
          customerid:curr.id.id
        } as SingleGroup)) as Array<SingleGroup>

        this.groups.forEach(curr=>{
          // console.log("test");
          this.http.post("api/user/admin/reserve/all",{
            "customerID":curr.customerid
          }).subscribe((val:any)=>{
            const temp=val.data.data.map((curr:any)=>({
              email:curr.email,
              id:curr.id.id,
              name:curr.firstName,
              surname:curr.lastName,
              status:curr.additionalInfo!=undefined?curr.additionalInfo.userCredentialsEnabled:false,
              accountEnabled:curr.additionalInfo!=undefined
            } as userInfo)) as Array<userInfo>
            this.sourceData=[...this.sourceData,...temp]
            // console.log(this.sourceData)
          })
        })
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
    if(this.nameGroup.valid&&this.emailGroup.valid&&this.surnameGroup.valid&&this.reserveGroup.valid){
      console.log(this.emailGroup.get("emailControl")?.value)
      this.http.post("api/user/admin/add",{
        customerID:this.reserveGroup.get("reserveControl")?.value[0],
        userInfo:{
          email:this.emailGroup.get("emailControl")?.value,
          firstName:this.nameGroup.get("nameControl")?.value,
          lastName:this.surnameGroup.get("surnameControl")?.value
        },
        reserves: this.reserveGroup.get("reserveControl")?.value.map((curr:any)=>{
          return {
            reserveID: curr, reserveName: this.groups.find(other=>other.customerid==curr)?.name
          }
        }),
      }).subscribe((curr:any)=>{
        if(curr.status==200&&curr.explain=="ok"){
          this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"User Added", icon:"check_circle"}});
          this.ngOnInit();
        }
      })

    }
    
  }
  confirmDelete(userId:string):void{
    const mydialog=this.confirmDialog.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to delete user: '+userId+'?',
      },
    });
  
    mydialog.afterClosed().subscribe(val=>{
      if(val){
        this.http.post("api/user/admin/remove",{
          userID:userId
        }).subscribe((val:any)=>{
          console.log(val);
          if(val.explain=="ok") {
            this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['red-snackbar'], data: {message:"User Deleted", icon:"check_circle"}});
            this.ngOnInit();
          }
        })
      }
    })

  }

  confirmSwitch(userId:string,currval:boolean):void{
    const mydialog=this.confirmDialog.open(DialogConfirmationComponent,{ data: {
      title: 'Confirm changing status.',
      dialogMessage: 'Are you sure you want to change the status of the user: '+userId+'?',
    }});
    mydialog.afterClosed().subscribe(val=>{
      if(val){
        if(!currval){
          this.http.post('api/user/admin/disable',{
            userID:userId
          }).subscribe((val:any)=>{
            console.log(val);
            if(val.explain=="ok") alert("User disabled");
          });
        }else {
          this.http.post('api/user/admin/enable',{
            userID:userId
          }).subscribe((val:any)=>{
            console.log(val);
            if(val.explain=="ok") alert("User enabled");
          });
        }
      }  
    })


  }

  editUser(id:string):void{
    this.router.navigate(['manage',{outlets:{managecontent:['edit-user',id]}}]);   
  }

}