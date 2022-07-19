import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'master-snackbar-alert',
  templateUrl: './snackbar-alert.component.html',
  styleUrls: ['./snackbar-alert.component.scss'],
})
export class SnackbarAlertComponent implements OnInit {
  message:string;
  icon:string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data:{message:string,icon:string}) {
    this.message = data.message;
    this.icon = data.icon;
  }

  ngOnInit(): void {}

}
