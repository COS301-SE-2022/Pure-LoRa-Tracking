import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  removeUser(userId:string): void {
    console.log(userId);
  }

  changeUserStatus(userId:string): void {
      console.log(userId);
    
  }

  openUserForm(): void {
    this.addUser = true;
  }

}
