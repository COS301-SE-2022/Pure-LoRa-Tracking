import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfilesEditComponent } from './profiles-edit/profiles-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export const clientManageViewSrcLibProfileEditRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatInputModule, MatSnackBarModule],
  declarations: [ProfilesEditComponent],
  exports: [ProfilesEditComponent],
})
export class ClientManageViewSrcLibProfileEditModule {}
