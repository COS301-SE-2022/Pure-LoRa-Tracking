import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
export const clientManageViewSrcLibUsersEditRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,MatFormFieldModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatInputModule,MatSelectModule],
  declarations: [UserEditComponent],
  exports: [UserEditComponent],
})
export class ClientManageViewSrcLibUsersEditModule {}
