import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DialogConfirmationComponent } from '@master/client/shared-ui/components-ui';

export interface userInfo{
  name: string,
  surname: string,
  id: string,
  email: string,
  status: boolean,
}
const usersList:userInfo[] = [
  {
    name: "James",
    surname: "Johnson",
    email: "james@gmail.com",
    id: "15454",
    status: true,
  },
  {
    name: "Piet",
    surname: "Piet",
    email: "james@gmail.com",
    id: "454545646",
    status: false,
  },
  {
    name: "Kim",
    surname: "Can",
    email: "kim@gmail.com",
    id: "74657456456",
    status: true,
  },
  {
    name: "Jack",
    surname: "Man",
    email: "jack@gmail.com",
    id: "45456456456",
    status: false,
  }
]
@Component({
  selector: 'master-reserve-users-view',
  templateUrl: './reserve-users-view.component.html',
  styleUrls: ['./reserve-users-view.component.scss'],
})
export class ReserveUsersViewComponent implements OnInit {
    
  tableColumns:string[] = ['id', 'surname', 'name','email',"status","delete"];
  sourceData = usersList;
  addUser= false;

  nameGroup!: FormGroup;
  surnameGroup!: FormGroup;
  emailGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, public confirmDialog: MatDialog) {}

  ngOnInit(): void {
    this.nameGroup = this._formBuilder.group({
      nameControl: ['', Validators.required],
    });
    this.surnameGroup = this._formBuilder.group({
      surnameControl: ['', Validators.required],
    });
    this.emailGroup = this._formBuilder.group({
      emailControl: ['', Validators.required],
    });
  }

  removeUser(userId:string): void {
    console.log(userId);
  }

  changeUserStatus(userId:string): void {
      console.log(userId);
    
  }

  openUserForm(): void {
    this.addUser = !this.addUser;
  }

  confirmDelete(userId:string):void{
    this.confirmDialog.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to delete user: '+userId+'?',
      }
    });
  }

  confirmSwitch(userId:string):void{
    this.confirmDialog.open(DialogConfirmationComponent,{ data: {
      title: 'Confirm changing status.',
      dialogMessage: 'Are you sure you want to change the status of the user: '+userId+'?',
    }});
  }

}
