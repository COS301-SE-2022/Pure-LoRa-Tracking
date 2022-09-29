import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogConfirmationComponent, SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';

export interface Reserve {
  name: string;
  id: string;
  email: string;
}

@Component({
  selector: 'master-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.scss'],
})
export class ReserveDetailComponent implements OnInit {
  reserves: Reserve[] = [];

  tableColumns:string[] = ['id','name','email','delete',"edit"];

  constructor(private router: Router, private http: HttpClient, private confirmDialog: MatDialog,private snackbar:MatSnackBar) {
    this.reserves = []
  }

  ngOnInit(): void {
    console.log("reserves");
    this.http.post("api/user/admin/groups", {

    }).subscribe((val: any) => {
      console.log(val.data.data)
      if (val.status == 200) {
        this.reserves = val.data.data.map((curr: any) => {
          return {
            name: curr.name,
            id: curr.id.id,
            email: curr.email
          }
        })
      }
      else {
        alert("Something went wrong, please contact an administrator");
      }
    })
  }

  openCreateReserve(): void {
    this.router.navigate(['manage', { outlets: { managecontent: ['reserve-create'] } }]);
  }

  deleteReserve(id: string): void {
    const mydialog = this.confirmDialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Confirm changing status.',
        dialogMessage: 'Are you sure you want to delete this reserve?',
      }
    });
    mydialog.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post("/api/reserve/admin/remove", {
          reserveID: id
        }).subscribe((val:any) => {
          if (val.status == 200&&val.explanation=="reserve removed") {
            this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['red-snackbar'], data: {message:"Reserve Deleted", icon:"check_circle"}});
            this.ngOnInit();
          }
          console.log("value after delete", val);
        })
      }
    })

  }

  editReseve(id: string): void {
    this.router.navigate(['manage', { outlets: { managecontent: ['reserve-edit', id, this.reserves.find(curr => curr.id == id)?.email, this.reserves.find(curr => curr.id == id)?.name] } }]);
  }
}
