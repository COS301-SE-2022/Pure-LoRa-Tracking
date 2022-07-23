import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveEditComponent } from './reserve-edit/reserve-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export const clientManageViewSrcLibReserveEditRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule ],
  declarations: [ReserveEditComponent],
  exports: [ReserveEditComponent],
})
export class ClientManageViewSrcLibReserveEditModule {}
