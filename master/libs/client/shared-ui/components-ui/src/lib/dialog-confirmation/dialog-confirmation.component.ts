import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  title: string,
  dialogMessage:string,
}

@Component({
  selector: 'master-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {
 
 
  title= '';
  message= '';

  constructor(public dialogRefr: MatDialogRef<DialogConfirmationComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.message = data.dialogMessage;
  }


  ngOnInit(): void {
    console.log("dialog opened");
  }

  closeDialog(): void {
    this.dialogRefr.close();
  }
}
