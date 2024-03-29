import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export const clientManageViewSrcLibUsersEditRoutes: Route[] = [
  {path:'', pathMatch: 'full', component:UserEditComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule,MatFormFieldModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatInputModule,MatSelectModule,MatSnackBarModule, RouterModule.forChild(clientManageViewSrcLibUsersEditRoutes)],
  declarations: [UserEditComponent],
  exports: [UserEditComponent],
})
export class ClientManageViewSrcLibUsersEditModule {}
