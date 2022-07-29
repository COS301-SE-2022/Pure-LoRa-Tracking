import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveDetailComponent } from './reserve-detail/reserve-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export const clientManageViewSrcLibReserveDetailViewRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: [ReserveDetailComponent],
  exports: [ReserveDetailComponent],
})
export class ClientManageViewSrcLibReserveDetailViewModule {}
